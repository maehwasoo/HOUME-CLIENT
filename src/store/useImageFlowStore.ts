import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const ENTRY_ROUTE = {
  GENERATE_BUTTON: 'GENERATE_BUTTON', // 경로1: 상단 "이미지 생성" 버튼
  HOME_BANNER: 'HOME_BANNER', // 경로2: 홈 배너 슬라이드
  FLOOR_PLAN: 'FLOOR_PLAN', // 경로3: "우리 집 공간으로 시작하기" 도면 클릭
  STYLE_RESTYLE: 'STYLE_RESTYLE', // 경로4: "다른 스타일로 꾸며보기"
  PRODUCT_SELECTION: 'PRODUCT_SELECTION', // 경로5: "상품" 탭 담기 → CTA
  PRODUCT_REGENERATE: 'PRODUCT_REGENERATE', // 경로5-재: 결과 → "다시 선택하기" → 상품 탭
} as const;

export type EntryRoute = (typeof ENTRY_ROUTE)[keyof typeof ENTRY_ROUTE];

// 서버 응답 viewType과 enum 값 통일
// +) 서버 응답의 'LEGACY'는 enum에서 제외 (LEGACY는 isCurationViewType 헬퍼에서 추천형으로 처리)
export const RESULT_TYPE = {
  BANNER: 'BANNER',
  FULL_FUNNEL: 'FULL_FUNNEL',
  STYLE: 'STYLE',
  PRODUCT: 'PRODUCT',
} as const;

export type ResultType = (typeof RESULT_TYPE)[keyof typeof RESULT_TYPE];

// viewType이 추천형인지 판단하는 헬퍼
export const isCurationViewType = (viewType: string | null | undefined) =>
  viewType !== RESULT_TYPE.BANNER &&
  viewType !== RESULT_TYPE.STYLE &&
  viewType !== RESULT_TYPE.PRODUCT;

// 경로5(PRODUCT_SELECTION)에서 ProductTab UI 복원에 사용하는 스냅샷
// productIds는 상품으로 이미지 생성 API payload용, productsToBeRestored는 외부(로그인게이트/ResultPage)로부터 ProductTab에 진입했을 때 사용
export interface ProductItem {
  id: number;
  title: string;
  brand: string;
  imageUrl?: string;
  originalPrice: number;
  discountPrice: number;
  discountRate: number;
}

// 경로별 프리셋 (경로에 따라 preset이 달라짐을 나타내고, 경로별 타입 안정성을 위해 discriminated union 적용)
// 퍼널 진입 시점에 setFlow()로 저장 → 최종 이미지 생성 API 호출 시 사용
export type PresetData =
  | { type: 'banner'; bannerId: number; answerId: number } // 경로2
  | { type: 'floorPlan'; floorPlanId: number } // 경로3: 홈에서 도면 선택
  | { type: 'style'; styleId: number } // 경로4
  | {
      // 경로5(product)는 productIds(API payload) + productsToBeRestored(UI 복원, 로그인 게이트 복귀/재선택 진입 시 ProductTab useState 초기값으로 사용)을 함께 보관
      // (홈 화면에서 상품 '탭'은 url이 없으므로, 자체 url이 존재하는 banner/style 플로우와 달리 UI 복원을 위해 productsToBeRestored 필드까지 있어야 함)
      type: 'product';
      productIds: number[];
      productsToBeRestored: ProductItem[];
    }; // 경로5

/** mutation 이후 funnel clear되어도 결과 GA에 쓸 퍼널 입력값 */
export interface FlowAnalyticsSnapshot {
  floorPlanId?: number;
  moodBoardIds?: number[];
  activityCode?: string;
  furnitureChipCodes?: string;
  productIds?: number[];
}

interface ImageFlowState {
  entryRoute: EntryRoute | null;
  resultType: ResultType | null;
  preset: PresetData | null;
  flowSnapshot: FlowAnalyticsSnapshot | null;
  // 퍼널 진입 시 호출, 진입경로 + 프리셋 세팅 및 resultType 자동 매핑
  setFlow: (params: { entryRoute: EntryRoute; preset?: PresetData }) => void;
  setFlowSnapshot: (snapshot: FlowAnalyticsSnapshot) => void;
  // preset만 선택적으로 비움 (entryRoute/resultType은 ResultPage에서 사용하므로 유지해야 하는 케이스에 사용)
  clearPreset: () => void;
  // 퍼널 완료/이탈 시 호출
  reset: () => void;
}

const RESULT_TYPE_MAP: Record<EntryRoute, ResultType> = {
  [ENTRY_ROUTE.GENERATE_BUTTON]: RESULT_TYPE.FULL_FUNNEL,
  [ENTRY_ROUTE.HOME_BANNER]: RESULT_TYPE.BANNER,
  [ENTRY_ROUTE.FLOOR_PLAN]: RESULT_TYPE.FULL_FUNNEL,
  [ENTRY_ROUTE.STYLE_RESTYLE]: RESULT_TYPE.STYLE,
  [ENTRY_ROUTE.PRODUCT_SELECTION]: RESULT_TYPE.PRODUCT,
  [ENTRY_ROUTE.PRODUCT_REGENERATE]: RESULT_TYPE.PRODUCT,
};

export const useImageFlowStore = create<ImageFlowState>()(
  persist(
    (set) => ({
      entryRoute: null,
      resultType: null,
      preset: null,
      flowSnapshot: null,
      setFlow: ({ entryRoute, preset }) =>
        set({
          entryRoute,
          resultType: RESULT_TYPE_MAP[entryRoute], // 결과 페이지 타입 자동 매핑
          preset: preset ?? null,
        }),
      setFlowSnapshot: (flowSnapshot) => set({ flowSnapshot }),
      clearPreset: () => set({ preset: null }),
      reset: () =>
        set({
          entryRoute: null,
          resultType: null,
          preset: null,
          flowSnapshot: null,
        }),
    }),
    {
      name: 'image-flow',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// 진입 경로 기반 다음 퍼널 스텝 분기 헬퍼
// 경로1,3: 도면→인테리어스타일, 2,4,5: 도면→이미지로딩
export const getNextFunnelStep = (
  entryRoute: EntryRoute
): 'INTERIOR_STYLE' | 'IMAGE_LOADING' => {
  if (
    entryRoute === ENTRY_ROUTE.GENERATE_BUTTON ||
    entryRoute === ENTRY_ROUTE.FLOOR_PLAN
  ) {
    return 'INTERIOR_STYLE';
  }
  return 'IMAGE_LOADING';
};

/**
 * ImageSetup → /generate 이동 시 unmount cleanup에서 entryRoute clear 생략
 * (LoadingPage·ResultPage GA image_entry_route 유지, useExitImageFlow.reset()까지)
 */
let entryRouteHeld = false;

export const holdEntryRoute = (): void => {
  entryRouteHeld = true;
};

export const consumeEntryRouteHold = (): boolean => {
  const held = entryRouteHeld;
  entryRouteHeld = false;
  return held;
};
