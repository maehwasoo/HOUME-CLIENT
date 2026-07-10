import type { FurnitureItem } from '@pages/mypage/types/apis/saveItemsList';

import { isCurationViewType } from '@store/useImageFlowStore';

import { IMG_RESULT_TYPE } from '@shared/analytics/params/result';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { getReturnScreenNameParams } from '@shared/analytics/utils/screenName';

import type {
  DateGroupResponse,
  ItemResponse,
} from '@apis/__generated__/data-contracts';

export const mypageScreenParams = () => ({
  screen_name: SCREEN_NAME.MYPAGE,
});

export const mypageReturnScreenParams = () =>
  getReturnScreenNameParams(SCREEN_NAME.HOME);

export const getMypageSavedItemsListParams = (
  items: Pick<FurnitureItem, 'rawProductId'>[] = []
) => ({
  saved_item_count: items.length,
  saved_item_ids:
    items
      .map((item) => item.rawProductId)
      .filter((id) => Number.isFinite(id))
      .join(', ') || undefined,
});

export const getMypageGenImgListParams = (groups: DateGroupResponse[] = []) => {
  const mypage_img_count = groups
    .flatMap((group) => group.items ?? [])
    .filter((item) => item.imageId != null).length;

  return { mypage_img_count };
};

const mapViewTypeToImgResultType = (
  viewType?: ItemResponse['viewType']
): (typeof IMG_RESULT_TYPE)[keyof typeof IMG_RESULT_TYPE] | undefined => {
  if (viewType == null) return undefined;

  // 결과 레이아웃 SSOT(isCurationViewType)와 동일 분류:
  // 추천형(FULL_FUNNEL/LEGACY)만 recommend, 나머지(PRODUCT/BANNER/STYLE)는 list
  return isCurationViewType(viewType)
    ? IMG_RESULT_TYPE.RECOMMEND
    : IMG_RESULT_TYPE.LIST;
};

export const getMypageGenImgItemParams = (item: ItemResponse) => ({
  gen_img_id: item.imageId,
  gen_img_style: item.bannerTitle ?? item.productSummaryText ?? undefined,
  img_result_type: mapViewTypeToImgResultType(item.viewType),
});
