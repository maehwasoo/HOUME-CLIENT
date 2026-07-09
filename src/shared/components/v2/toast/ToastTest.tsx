import {
  TOAST_ACTION_LABEL,
  TOAST_MESSAGE,
} from '@shared/constants/toastMessage';
import { TOAST_TYPE, TOASTER_ID } from '@shared/types/toast';

import MainToaster from './Sonner';
import * as styles from './Toast.css';
import { useToast } from './useToast';

const SonnerToastTest = () => {
  const { notify } = useToast();

  return (
    <div className={styles.testStyle}>
      <MainToaster />

      <button
        type="button"
        onClick={() =>
          notify({
            text: TOAST_MESSAGE.LOGIN_SUCCESS,
            type: TOAST_TYPE.SUCCESS,
            options: {
              toasterId: TOASTER_ID.TOP_4,
            },
          })
        }
      >
        로그인 성공
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: TOAST_MESSAGE.LOGIN_ERROR,
            type: TOAST_TYPE.ERROR,
            options: {
              toasterId: TOASTER_ID.BOTTOM_8,
            },
          })
        }
      >
        로그인 실패
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: TOAST_MESSAGE.REQUIRED_ITEM_LOCKED,
            type: TOAST_TYPE.INFO,
            options: {
              toasterId: TOASTER_ID.TOP_4,
              style: {
                marginTop: '4rem',
              },
            },
          })
        }
      >
        안내 토스트
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: TOAST_MESSAGE.SAVED_ITEM_STORED,
            type: TOAST_TYPE.ACTION,
            actionLabel: TOAST_ACTION_LABEL.VIEW,
            onClick: () => {},
            options: {
              toasterId: TOASTER_ID.BOTTOM_4,
              style: {
                marginBottom: '4rem',
              },
            },
          })
        }
      >
        찜 바로가기
      </button>
      <button
        type="button"
        onClick={() =>
          notify({
            text: TOAST_MESSAGE.SAVED_ITEM_REMOVED,
            type: TOAST_TYPE.ACTION,
            actionLabel: TOAST_ACTION_LABEL.UNDO,
            onClick: () => {},
            options: {
              toasterId: TOASTER_ID.BOTTOM_4,
              style: {
                marginBottom: '4rem',
              },
            },
          })
        }
      >
        찜 되돌리기
      </button>
    </div>
  );
};

export default SonnerToastTest;
