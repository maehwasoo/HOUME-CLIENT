// Step2FloorPlan.tsx (UI만 담당)
import { FUNNELHEADER_IMAGES } from '@pages/imageSetup/constants/headerImages';
import { useFloorPlan } from '@pages/imageSetup/hooks/useFloorPlan';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';

import * as styles from './FloorPlan.css';
import FloorPlanList from './FloorPlanList';
import FunnelHeader from '../../components/header/FunnelHeader';

import type {
  CompletedFloorPlan,
  ImageSetupSteps,
} from '../../types/funnel/steps';

interface FloorPlanProps {
  context: ImageSetupSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

const FloorPlan = ({ context, onNext }: FloorPlanProps) => {
  const {
    floorPlanList,
    isPending,
    isError,
    refetch,
    selectedId,
    isMirror,
    selectedImage,
    handleImageSelect,
    handleFlipToggle,
    handleFloorPlanSelection,
  } = useFloorPlan(context, onNext);

  const hasFloorPlans = floorPlanList && floorPlanList.length > 0;

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`유사한 집 구조를 선택해주세요`}
        detail={`템플릿을 선택하면 좌우반전을 할 수 있어요.`}
        currentStep={2}
        image={FUNNELHEADER_IMAGES[2]}
        size={hasFloorPlans ? 'short' : undefined}
      />

      {isError ? (
        <InlineError message="도면을 불러울 수 없습니다" onRetry={refetch} />
      ) : isPending ? (
        <Loading />
      ) : hasFloorPlans ? (
        <FloorPlanList
          floorPlanList={floorPlanList}
          selectedId={selectedId}
          isMirror={isMirror}
          selectedImage={selectedImage}
          onImageSelect={handleImageSelect}
          onFlipToggle={handleFlipToggle}
          onFloorPlanSelection={handleFloorPlanSelection}
        />
      ) : (
        <div>사용 가능한 집 구조 템플릿이 없습니다.</div>
      )}
    </div>
  );
};

export default FloorPlan;
