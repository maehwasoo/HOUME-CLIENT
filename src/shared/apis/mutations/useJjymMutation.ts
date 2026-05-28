import { useMutation } from '@tanstack/react-query';

import { useSavedItemsStore } from '@store/useSavedItemsStore';

import type { SaveItemsRequest, SaveItemsResponse } from '@shared/types/jjym';
import { TOAST_TYPE, TOASTER_ID } from '@shared/types/toast';

import { queryClient } from '@apis/config/queryClient';
import { HTTPMethod, request } from '@apis/config/request';

import { useToast } from '@components/v2/toast/useToast';

import { API_ENDPOINT } from '@constants/apiEndpoints';
import { TOAST_ACTION_LABEL, TOAST_MESSAGE } from '@constants/toastMessage';

import { invalidateJjymRelatedQueries } from '@utils/invalidateJjymQueries';

import type { AxiosError } from 'axios';

type JjymSavedToast = 'move' | 'stored' | 'none';
type JjymRemovedToast = 'info' | 'undo';

interface UseJjymMutationOptions {
  savedToastType?: JjymSavedToast;
  removedToastType?: JjymRemovedToast;
  onSavedAction?: () => void;
  invalidateSavedItemsList?: boolean; // 찜 목록 무효화 여부
}

export const postJjym = async (
  jjymData: SaveItemsRequest
): Promise<SaveItemsResponse> => {
  return request<SaveItemsResponse>({
    method: HTTPMethod.POST,
    url: API_ENDPOINT.GENERATE.JJYM_V2(jjymData.rawProductId),
  });
};

const TOAST_OPTIONS = { toasterId: TOASTER_ID.BOTTOM_4 };

const getSavedToastContent = (type: JjymSavedToast) => {
  if (type === 'stored') {
    return {
      text: TOAST_MESSAGE.SAVED_ITEM_STORED,
      actionLabel: TOAST_ACTION_LABEL.VIEW,
    };
  }

  return {
    text: TOAST_MESSAGE.SAVED_ITEM_MOVE,
    actionLabel: TOAST_ACTION_LABEL.MOVE,
  };
};

export const useJjymMutation = (options?: UseJjymMutationOptions) => {
  const toggleSaveProduct = useSavedItemsStore((s) => s.toggleSaveProduct);
  const { notify } = useToast();
  const savedToastType = options?.savedToastType ?? 'move';
  const removedToastType = options?.removedToastType ?? 'info';
  const shouldInvalidateSavedItemsList =
    options?.invalidateSavedItemsList !== false;

  const syncSavedStateWithServer = async (rawProductId: number) => {
    const response = await postJjym({ rawProductId });
    const isSavedNow = useSavedItemsStore
      .getState()
      .savedProductIds.has(rawProductId);

    if (isSavedNow !== response.favorited) {
      toggleSaveProduct(rawProductId);
    }

    await invalidateJjymRelatedQueries(
      queryClient,
      shouldInvalidateSavedItemsList
    );
  };

  return useMutation<SaveItemsResponse, AxiosError, number>({
    mutationKey: ['jjym'],
    mutationFn: (rawProductId) => postJjym({ rawProductId }),

    onMutate: async (rawProductId) => {
      toggleSaveProduct(rawProductId);
      return { rawProductId };
    },

    onSuccess: async (data, rawProductId) => {
      const isSavedNow = useSavedItemsStore
        .getState()
        .savedProductIds.has(rawProductId);

      if (isSavedNow !== data.favorited) {
        toggleSaveProduct(rawProductId);
      }

      if (data.favorited) {
        if (savedToastType === 'none') {
          await invalidateJjymRelatedQueries(
            queryClient,
            shouldInvalidateSavedItemsList
          );
          return;
        }

        const toastContent = getSavedToastContent(savedToastType);
        notify({
          text: toastContent.text,
          type: TOAST_TYPE.ACTION,
          actionLabel: toastContent.actionLabel,
          onClick: options?.onSavedAction,
          options: TOAST_OPTIONS,
        });
      } else if (removedToastType === 'undo') {
        notify({
          text: TOAST_MESSAGE.SAVED_ITEM_REMOVED,
          type: TOAST_TYPE.ACTION,
          actionLabel: TOAST_ACTION_LABEL.UNDO,
          onClick: () => {
            toggleSaveProduct(rawProductId);

            void syncSavedStateWithServer(rawProductId).catch(() => {
              toggleSaveProduct(rawProductId);
            });
          },
          options: TOAST_OPTIONS,
        });
      } else {
        notify({
          text: TOAST_MESSAGE.SAVED_ITEM_REMOVED,
          type: TOAST_TYPE.INFO,
          options: TOAST_OPTIONS,
        });
      }

      await invalidateJjymRelatedQueries(
        queryClient,
        shouldInvalidateSavedItemsList
      );
    },

    onError: (_error, rawProductId) => {
      toggleSaveProduct(rawProductId);
    },
  });
};
