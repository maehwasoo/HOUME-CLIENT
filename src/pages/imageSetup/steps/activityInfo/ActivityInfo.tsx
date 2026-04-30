import { overlay } from 'overlay-kit';

import { useActivityInfo } from '@pages/imageSetup/hooks/activityInfo/useActivityInfo';

import InlineError from '@components/inlineError/InlineError';
import Loading from '@components/loading/Loading';
import ActionButton from '@components/v2/button/actionButton/ActionButton';
import Chip from '@components/v2/chip/Chip';
import Icon from '@components/v2/icon/Icon';
import TextHeading from '@components/v2/textHeading/TextHeading';

import * as styles from './ActivityInfo.css';
import ActivityTypeSheet from './ActivityTypeSheet';
import SelectTrigger from './SelectTrigger';

import type { ImageSetupSteps } from '../../types/funnel/steps';

interface ActivityInfoProps {
  context: ImageSetupSteps['ActivityInfo'];
}

const ActivityInfo = ({ context }: ActivityInfoProps) => {
  const {
    isPending,
    isError,
    refetch,
    setFormData,
    isFormCompleted,
    activitySelection,
    selectedActivityLabel,
    activities,
    categories,
    categorySelections,
    globalConstraints,
    handleSubmit,
  } = useActivityInfo(context);

  const handleActivityTriggerClick = () => {
    overlay.open(({ unmount }) => (
      <ActivityTypeSheet
        open
        activities={activities}
        selectedActivityCode={activitySelection.selectedActivityItem?.code}
        onConfirm={(activityCode) => {
          setFormData((prev) => ({ ...prev, activity: activityCode }));
          unmount();
        }}
        onClose={unmount}
      />
    ));
  };

  if (isError) return <InlineError onRetry={refetch} />;
  if (isPending || !categorySelections) return <Loading />;

  // nameEng → selection 매핑
  const selectionByNameEng: Record<string, typeof categorySelections.bed> = {
    BED: categorySelections.bed,
    SOFA: categorySelections.sofa,
    STORAGE: categorySelections.storage,
    TABLE: categorySelections.table,
    SELECTIVE: categorySelections.selective,
    LIGHTING: categorySelections.lighting,
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainArea}>
        <TextHeading
          title="마지막 단계예요!"
          caption={
            '생활 패턴과 필요한 가구를 알려주시면\n꼭 맞는 인테리어를 추천해드릴게요.'
          }
        />

        <div className={styles.activitySection}>
          <TextHeading
            type="sub"
            title="주요 활동"
            caption="선택한 활동에 필요한 가구와 함께 이미지를 생성해요."
          />
          <SelectTrigger
            selectedActivity={activitySelection.selectedActivityItem}
            onClick={handleActivityTriggerClick}
          />
        </div>

        {selectedActivityLabel && (
          <div className={styles.furnitureSection}>
            <TextHeading
              type="sub"
              title="가구"
              caption="선택한 가구들로 이미지를 생성해드려요. (최대 6개)"
            />
            <div className={styles.furList}>
              {/* TODO: 추후 Chip 최신화하기 (아이콘 포함 Chip 반영) */}
              {categories.map((category) => {
                const selection = selectionByNameEng[category.nameEng!];
                if (!selection) return null;

                return (
                  <div
                    key={category.categoryId}
                    className={styles.categoryGroup}
                  >
                    <span className={styles.furTitle}>{category.nameKr}</span>
                    <div className={styles.chipList}>
                      {category.furnitures!.map((furniture) => {
                        const isSelected = selection.selectedValues.includes(
                          furniture.id!
                        );
                        const status = selection.furnitureStatus.find(
                          (s) => s.id === furniture.id
                        );
                        const isRequired =
                          globalConstraints.isRequiredFurniture(furniture.id!);

                        return (
                          <Chip
                            key={furniture.id}
                            selected={isSelected}
                            color="weak"
                            disabled={!status?.isActive && !isSelected}
                            suffixIcon={
                              isRequired ? (
                                <Icon name="Lock" size="16" />
                              ) : undefined
                            }
                            onClick={() =>
                              selection.toggleFurniture(furniture.id!)
                            }
                          >
                            {furniture.label}
                          </Chip>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedActivityLabel && (
        <div className={styles.buttonWrapper}>
          <ActionButton
            size="2XL"
            fullWidth
            disabled={!isFormCompleted}
            onClick={handleSubmit}
          >
            이미지 생성하기
          </ActionButton>
        </div>
      )}
    </div>
  );
};

export default ActivityInfo;
