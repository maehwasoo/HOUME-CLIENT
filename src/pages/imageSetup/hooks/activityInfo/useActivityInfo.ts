import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import type { GenerateImageRequest } from '@pages/generate/types/generate';
import {
  logSelectFurnitureClickBtnCTA,
  logSelectFurnitureClickBtnCTACreditError,
} from '@pages/imageSetup/utils/analytics';

import { ROUTES } from '@routes/paths';

import { useCreditGuard } from '@hooks/useCreditGuard';

import { useActivitySelection } from './useActivitySelection';
import { useCategorySelection } from './useCategorySelection';
import { useGlobalConstraints } from './useGlobalConstraints';
import { useActivitiesQuery } from '../../apis/queries/useActivitiesQuery';
import { useFurnitureCategoriesQuery } from '../../apis/queries/useFurnitureCategoriesQuery';
import { useFunnelStore } from '../../stores/useFunnelStore';
import { CATEGORY_SELECTION_MODE } from '../../types/funnel/activityInfo';

import type { ActivityInfoFormData } from '../../types/funnel/activityInfo';
import type { ImageSetupSteps } from '../../types/funnel/steps';

/**
 * - 주요활동/가구 카테고리 쿼리 호출
 * - 사용자 입력값 관리 (formData 상태 + Zustand persist)
 * - 주요활동 선택 / 카테고리별 가구 토글 / 전역 제약 훅 위임
 * - 활동 변경 시 가구 초기화 + 필수 가구 자동 선택
 * - 제출(크레딧 체크 → sessionStorage → /generate)
 */
export const useActivityInfo = (context: ImageSetupSteps['ActivityInfo']) => {
  const navigate = useNavigate();

  // 크레딧 가드 훅 (이미지 생성 시 1크레딧 필요)
  const { checkCredit, isChecking } = useCreditGuard(1);
  // 버튼 비활성화 상태 (토스트 표시 후 비활성화)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // 서버 데이터 — 활동 목록 + 가구 카테고리 (두 쿼리 독립 호출)
  const {
    data: activitiesData,
    isPending: isActivitiesPending,
    isError: isActivitiesError,
    refetch: refetchActivities,
  } = useActivitiesQuery();
  const {
    data: categoriesData,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
    refetch: refetchCategories,
  } = useFurnitureCategoriesQuery();

  // 둘 중 하나라도 pending/error면 전체가 pending/error
  const isPending = isActivitiesPending || isCategoriesPending;
  const isError = isActivitiesError || isCategoriesError;
  const refetch = () => {
    if (isActivitiesError) refetchActivities();
    if (isCategoriesError) refetchCategories();
  };

  // Zustand store에서 저장된 데이터
  const savedActivityInfo = useFunnelStore((state) => state.activityInfo);
  const savedFloorPlan = useFunnelStore((state) => state.floorPlan);
  const savedMoodBoardIds = useFunnelStore((state) => state.moodBoardIds);

  // 초기값 설정: Zustand에 값이 있으면 사용, 없으면 context 사용
  const [formData, setFormData] = useState<ActivityInfoFormData>({
    activity: savedActivityInfo?.activity ?? context.activity,
    furnitureIds: savedActivityInfo?.furnitureIds ?? context.furnitureIds ?? [],
  });

  // ActivityInfo는 마지막 스텝이므로 formData가 변경될 때마다 실시간으로 persist 저장
  useEffect(() => {
    useFunnelStore.getState().setActivityInfo({
      activity: formData.activity,
      furnitureIds: formData.furnitureIds,
    });
  }, [formData.activity, formData.furnitureIds]);

  // 주요활동 선택 훅 — 활동 객체 + 필수 가구 추출 담당
  const activitySelection = useActivitySelection(
    activitiesData?.activities,
    formData.activity
  );

  // 전역 제약조건 훅 (최대 6개 + 필수 가구 보호)
  const globalConstraints = useGlobalConstraints(
    formData.furnitureIds,
    activitySelection.getRequiredFurnitureIds(),
    !!formData.activity
  );

  // 카테고리별 가구 선택 훅 (API 카테고리 순서 기준 인덱싱)
  const bed = useCategorySelection(
    categoriesData?.categories[0] ?? null,
    CATEGORY_SELECTION_MODE.BED,
    formData,
    setFormData,
    globalConstraints
  );
  const sofa = useCategorySelection(
    categoriesData?.categories[1] ?? null,
    CATEGORY_SELECTION_MODE.SOFA,
    formData,
    setFormData,
    globalConstraints
  );
  const table = useCategorySelection(
    categoriesData?.categories[2] ?? null,
    CATEGORY_SELECTION_MODE.TABLE,
    formData,
    setFormData,
    globalConstraints
  );
  const selective = useCategorySelection(
    categoriesData?.categories[3] ?? null,
    CATEGORY_SELECTION_MODE.SELECTIVE,
    formData,
    setFormData,
    globalConstraints
  );

  // 카테고리 선택 객체 구성
  const categorySelections = categoriesData
    ? { bed, sofa, table, selective }
    : null;

  // 선택된 주요 활동의 라벨
  const selectedActivityLabel = activitySelection.selectedActivityItem?.label;

  // 타입 가드: 완료된 데이터인지 확인
  const isCompleteActivityInfo = (
    data: ActivityInfoFormData
  ): data is Required<ActivityInfoFormData> => {
    return !!(
      data.activity &&
      Array.isArray(data.furnitureIds) &&
      data.furnitureIds.length > 0
    );
  };

  // 입력값 완료 여부 확인
  const isFormCompleted = isCompleteActivityInfo(formData);

  // 주요활동 변경 시 기존 가구 초기화 후 필수 가구 자동 선택
  useEffect(() => {
    // Zustand에 저장된 데이터가 있으면 해당 데이터 유지 (복원 케이스 스킵)
    if (savedActivityInfo?.activity === formData.activity) {
      return;
    }

    if (formData.activity) {
      const requiredIds = activitySelection.getRequiredFurnitureIds();
      setFormData((prev) => ({
        ...prev,
        furnitureIds: requiredIds,
      }));
    } else {
      // 주요활동이 해제된 경우 모든 가구 선택 해제
      setFormData((prev) => ({
        ...prev,
        furnitureIds: [],
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.activity, savedActivityInfo]);

  // 제출 핸들러
  const handleSubmit = async () => {
    if (!isFormCompleted) return;

    // 중복 클릭 방지
    if (isChecking || isButtonDisabled) return;

    // CTA 버튼 클릭 시 GA 이벤트 전송
    logSelectFurnitureClickBtnCTA();

    // 이미지 생성 전 크레딧 확인
    const hasCredit = await checkCredit();
    if (!hasCredit) {
      logSelectFurnitureClickBtnCTACreditError();
      setIsButtonDisabled(true);
      return;
    }

    // TODO: 이미지 생성 API 명세 확정 시 selectiveIds → furnitureIds 직접 대입으로 변경
    // (현재는 서버가 selectiveIds로 받고 있어 클라이언트 furnitureIds를 매핑)
    const generateImageRequest: GenerateImageRequest = {
      houseId: 0, // TODO: 경로별 API 분리 후 제거
      equilibrium: '', // TODO: 경로별 API 분리 후 제거
      floorPlan: {
        floorPlanId:
          savedFloorPlan?.floorPlanId ?? context.floorPlan.floorPlanId,
        isMirror: savedFloorPlan?.isMirror ?? context.floorPlan.isMirror,
      },
      moodBoardIds: savedMoodBoardIds ?? context.moodBoardIds,
      activity: formData.activity!,
      selectiveIds: formData.furnitureIds!,
    };

    // sessionStorage에 저장
    sessionStorage.setItem(
      'generate_image_request',
      JSON.stringify(generateImageRequest)
    );

    navigate(ROUTES.GENERATE);

    // 퍼널 완료 후 Zustand 초기화
    useFunnelStore.getState().reset();
  };

  return {
    // 서버 데이터 상태
    isPending,
    isError,
    refetch,

    // 폼 상태
    formData,
    setFormData,
    isFormCompleted,

    // 주요활동 관련
    activitySelection,
    selectedActivityLabel,
    getRequiredFurnitureLabels: activitySelection.getRequiredFurnitureLabels,

    // 활동 목록 (바텀시트용)
    activities: activitiesData?.activities ?? [],

    // 가구 카테고리 데이터, 선택 상태
    categories: categoriesData?.categories ?? [],
    categorySelections,

    // 전역 제약조건
    globalConstraints,

    // 액션
    handleSubmit,
  };
};
