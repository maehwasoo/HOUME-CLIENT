import { useNavigate } from 'react-router-dom';

import { useHouseTemplatesQuery } from '@pages/imageSetup/v2/apis/queries/useHouseTemplatesQuery';

import { ROUTES } from '@routes/paths';

import { ENTRY_ROUTE, useImageFlowStore } from '@store/useImageFlowStore';

import RoomTypeCard from '@components/v2/roomTypeCard/RoomTypeCard';

import TextButton from '@/shared/components/v2/btnText/TextButton';

import * as styles from './RoomTypeSection.css';

const RoomTypeSection = () => {
  const navigate = useNavigate();
  const { data } = useHouseTemplatesQuery({ size: 4 });
  const floorPlans = data?.floorPlans ?? [];

  // "더보기" / "more" 카드: floorPlanId 없이 진입, 사용자가 그리드에서 도면을 직접 선택
  const handleMoreClick = () => {
    useImageFlowStore
      .getState()
      .setFlow({ entryRoute: ENTRY_ROUTE.FLOOR_PLAN });
    navigate(ROUTES.IMAGE_SETUP);
  };

  // 홈에서 도면 카드 클릭: floorPlanId를 preset으로 전달 → 퍼널 진입 즉시 해당 도면 시트 자동 오픈
  const handleFloorPlanClick = (floorPlanId: number | undefined) => {
    if (floorPlanId === undefined) return;
    useImageFlowStore.getState().setFlow({
      entryRoute: ENTRY_ROUTE.FLOOR_PLAN,
      preset: { type: 'floorPlan', floorPlanId },
    });
    navigate(ROUTES.IMAGE_SETUP);
  };

  return (
    <section className={styles.section}>
      <div className={styles.headerRow}>
        <h2 className={styles.sectionTitle}>우리 집 공간으로 시작하기</h2>
        <TextButton
          color="secondary"
          size="s"
          rightIcon="ArrowRight"
          onClick={handleMoreClick}
        >
          더보기
        </TextButton>
      </div>
      <div className={styles.cardScroll}>
        <div className={styles.cardList}>
          {floorPlans.map((floorPlan) => (
            <div key={floorPlan.id} className={styles.cardItem}>
              <RoomTypeCard
                type="default"
                size="s"
                label={floorPlan.name ?? ''}
                imageSrc={floorPlan.imageUrl ?? ''}
                onClick={() => handleFloorPlanClick(floorPlan.id)}
              />
            </div>
          ))}
          <div className={styles.cardItem}>
            <RoomTypeCard type="more" size="s" onClick={handleMoreClick} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoomTypeSection;
