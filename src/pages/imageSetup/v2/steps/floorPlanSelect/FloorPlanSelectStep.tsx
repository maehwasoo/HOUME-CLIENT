import PageLayout from '@components/pageLayout/PageLayout';

import FilterSheet from './FilterSheet';
import FloorPlanSelectGrid from './FloorPlanSelectGrid';
import FloorPlanSheet from './FloorPlanSheet';
import { useFloorPlanSelect } from '../../hooks/useFloorPlanSelect';

import type {
  CompletedFloorPlan,
  ImageSetupSteps,
} from '../../../types/funnel/steps';

interface FloorPlanSelectStepProps {
  context: ImageSetupSteps['FloorPlan'];
  onNext: (data: CompletedFloorPlan) => void;
}

const FloorPlanSelectStep = ({ context, onNext }: FloorPlanSelectStepProps) => {
  const {
    filterCategories,
    filteredFloorPlans,
    selectedFloorPlan,
    selectedDetailViews,
    recentFloorPlan,
    handleCardClick,
    handleConfirmFloorPlan,
    handleConfirmRecentFloorPlan,
    grid,
    filterSheet,
    floorPlanSheet,
    recentSheet,
  } = useFloorPlanSelect(context, onNext);

  return (
    <PageLayout
      header={{
        type: 'title',
        title: '원하는 공간 선택하기',
        backLabel: '이전',
      }}
    >
      <FloorPlanSelectGrid
        filterCategories={filterCategories}
        floorPlans={filteredFloorPlans}
        appliedFilters={grid.appliedFilters}
        onCardClick={handleCardClick}
        onFilterChipClick={grid.onFilterChipClick}
        onFilterChipClear={grid.onFilterChipClear}
      />

      <FilterSheet
        open={filterSheet.open}
        onClose={filterSheet.onClose}
        filterCategories={filterCategories}
        pendingFilters={filterSheet.pendingFilters}
        onFilterChange={filterSheet.onFilterChange}
        onApply={filterSheet.onApply}
        onReset={filterSheet.onReset}
      />

      {/* TODO: overlay-kit에 상태관리 위임, use-funnel에 등록 */}
      <FloorPlanSheet
        open={floorPlanSheet.open}
        onClose={floorPlanSheet.onClose}
        floorPlanName={selectedFloorPlan?.name ?? ''}
        detailViews={selectedDetailViews}
        onConfirm={handleConfirmFloorPlan}
      />

      {recentFloorPlan && (
        <FloorPlanSheet
          open={recentSheet.open}
          onClose={recentSheet.onClose}
          floorPlanName={recentFloorPlan.name}
          detailViews={[recentFloorPlan]}
          onConfirm={handleConfirmRecentFloorPlan}
        />
      )}
    </PageLayout>
  );
};

export default FloorPlanSelectStep;
