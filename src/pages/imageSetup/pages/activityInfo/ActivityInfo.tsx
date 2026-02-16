import { useActivityOptionsQuery } from '@/pages/imageSetup/apis/activityInfo';
import { FUNNELHEADER_IMAGES } from '@/pages/imageSetup/constants/headerImages';
import { useActivityInfo } from '@/pages/imageSetup/hooks/activityInfo/useActivityInfo';
import { useCreditCheck } from '@/pages/imageSetup/hooks/useCreditCheck';
import CtaButton from '@/shared/components/button/ctaButton/CtaButton';
import InlineError from '@/shared/components/inlineError/InlineError';
import Loading from '@/shared/components/loading/Loading';

import * as styles from './ActivityInfo.css';
import ButtonGroup from '../../components/buttonGroup/ButtonGroup';
import Caption from '../../components/caption/Caption';
import FunnelHeader from '../../components/header/FunnelHeader';
import HeadingText from '../../components/headingText/HeadingText';

import type { ImageSetupSteps } from '../../types/funnel/steps';

interface ActivityInfoProps {
  context: ImageSetupSteps['ActivityInfo'];
}

const ActivityInfo = ({ context }: ActivityInfoProps) => {
  const {
    data: activityOptionsData,
    isPending,
    isError,
    refetch,
  } = useActivityOptionsQuery();

  // console.log(activityOptionsData);

  const {
    handleSubmit,
    isFormCompleted,
    selectedActivityLabel,
    getRequiredFurnitureLabels,
    activitySelection,
    categorySelections,
  } = useActivityInfo(context, activityOptionsData);

  // 크레딧 체크 훅
  const { hasCredit, isCreditChecked, checkCredit } = useCreditCheck();

  // 이미지 생성 핸들러
  const handleImageGeneration = () => {
    const isValid = checkCredit(); // 크레딧 확인 및 CTA 버튼 상태 관리

    if (isValid) {
      handleSubmit();
    }
  };

  const isReady =
    !isError && !isPending && activityOptionsData && categorySelections;

  return (
    <div className={styles.container}>
      <FunnelHeader
        title={`마지막 단계예요!`}
        detail={`집에서 주로 하는 활동과\n배치가 필요한 가구에 대해 알려주세요.`}
        currentStep={4}
        image={FUNNELHEADER_IMAGES[4]}
      />

      {isError ? (
        <InlineError onRetry={refetch} />
      ) : !isReady ? (
        <Loading />
      ) : (
        <div className={styles.contents}>
          <div>
            <HeadingText
              title="주요 활동"
              subtitle="선택한 활동에 최적화된 동선을 알려드려요."
            />
            <div className={styles.activityButton}>
              <ButtonGroup<string>
                options={activityOptionsData.activities}
                selectedValues={activitySelection.selectedValues}
                onSelectionChange={activitySelection.handleActivityChange}
                keyExtractor={(option) => option.code}
                selectionMode="single"
                buttonSize="large"
                layout="grid-2"
              />
            </div>
            {selectedActivityLabel && (
              <div className={styles.caption}>
                <Caption
                  code={selectedActivityLabel}
                  option={getRequiredFurnitureLabels()}
                />
              </div>
            )}
          </div>

          <div className={styles.furnitures}>
            <HeadingText
              title="가구"
              subtitle={`선택한 가구들로 이미지를 생성해드려요. (${
                categorySelections.bed.selectedValues.length +
                categorySelections.sofa.selectedValues.length +
                categorySelections.storage.selectedValues.length +
                categorySelections.table.selectedValues.length +
                categorySelections.selective.selectedValues.length
              }/6)`}
            />
            <ButtonGroup<number>
              title={activityOptionsData.categories[0].nameKr}
              titleSize="small"
              hasBorder={true}
              options={activityOptionsData.categories[0].furnitures}
              selectedValues={categorySelections.bed.selectedValues}
              onSelectionChange={categorySelections.bed.handleChange}
              keyExtractor={(option) => option.id!}
              selectionMode="single"
              buttonSize="xsmall"
              layout="grid-4"
              buttonStatuses={categorySelections.bed.furnitureStatus}
            />

            <ButtonGroup<number>
              title={activityOptionsData.categories[1].nameKr}
              titleSize="small"
              hasBorder={true}
              options={activityOptionsData.categories[1].furnitures}
              selectedValues={categorySelections.sofa.selectedValues}
              onSelectionChange={categorySelections.sofa.handleChange}
              keyExtractor={(option) => option.id!}
              selectionMode="single"
              buttonSize="medium"
              layout="grid-2"
              buttonStatuses={categorySelections.sofa.furnitureStatus}
            />

            <ButtonGroup<number>
              title={activityOptionsData.categories[2].nameKr}
              titleSize="small"
              options={activityOptionsData.categories[2].furnitures}
              selectedValues={categorySelections.storage.selectedValues}
              onSelectionChange={categorySelections.storage.handleChange}
              keyExtractor={(option) => option.id!}
              selectionMode="multiple"
              buttonSize="large"
              layout="grid-2"
              buttonStatuses={categorySelections.storage.furnitureStatus}
            />

            <ButtonGroup<number>
              title={activityOptionsData.categories[3].nameKr}
              titleSize="small"
              options={activityOptionsData.categories[3].furnitures}
              selectedValues={categorySelections.table.selectedValues}
              onSelectionChange={categorySelections.table.handleChange}
              keyExtractor={(option) => option.id!}
              selectionMode="multiple"
              buttonSize="small"
              layout="grid-3"
              buttonStatuses={categorySelections.table.furnitureStatus}
            />

            <ButtonGroup<number>
              title={activityOptionsData.categories[4].nameKr}
              titleSize="small"
              options={activityOptionsData.categories[4].furnitures}
              selectedValues={categorySelections.selective.selectedValues}
              onSelectionChange={categorySelections.selective.handleChange}
              keyExtractor={(option) => option.id!}
              selectionMode="multiple"
              buttonSize="large"
              layout="grid-2"
              buttonStatuses={categorySelections.selective.furnitureStatus}
            />
          </div>

          <div>
            <CtaButton
              isActive={isFormCompleted && (!isCreditChecked || hasCredit)}
              onClick={handleImageGeneration}
            >
              이미지 생성하기
            </CtaButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityInfo;
