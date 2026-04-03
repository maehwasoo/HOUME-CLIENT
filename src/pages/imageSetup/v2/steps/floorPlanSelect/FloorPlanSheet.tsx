import { useRef } from 'react';

import clsx from 'clsx';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

import CloseBottomSheet from '@components/v2/bottomSheet/CloseBottomSheet';
import ActionButton from '@components/v2/button/actionButton/ActionButton';
import IconButton from '@components/v2/button/IconButton';
import Icon from '@components/v2/icon/Icon';

import * as styles from './FloorPlanSheet.css';
import { useFloorPlanSheet } from '../../hooks/useFloorPlanSheet';

import type { FloorPlanDetailView } from '../../types/floorPlan';
import type { Swiper as SwiperType } from 'swiper';

interface FloorPlanSheetProps {
  open: boolean;
  onClose: () => void;
  floorPlanName: string;
  detailViews: FloorPlanDetailView[];
  onConfirm: () => void;
}

const FloorPlanSheet = ({
  open,
  onClose,
  floorPlanName,
  detailViews,
  onConfirm,
}: FloorPlanSheetProps) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const {
    currentView,
    isMultiView,
    isMirror,
    toggleMirror,
    selectedViewIndex,
    setViewIndex,
  } = useFloorPlanSheet(detailViews);

  if (!currentView) return null;

  return (
    <CloseBottomSheet
      open={open}
      onClose={onClose}
      titleSlot={
        <div className={styles.titleRow}>
          <Icon name="DoubleStar" size="16" />
          <span className={styles.titleMain}>{floorPlanName}</span>
          <span className={styles.titleMeta}>·</span>
          <span className={styles.titleMeta}>{currentView.equilibrium}</span>
        </div>
      }
      contentSlot={
        <div className={styles.content}>
          <div className={styles.mirrorWrapper}>
            <div className={styles.swiperContainer}>
              <Swiper
                modules={[Navigation]}
                slidesPerView={1}
                loop={isMultiView}
                initialSlide={selectedViewIndex}
                onSwiper={(swiper) => {
                  swiperRef.current = swiper;
                }}
                // swiper.realIndex로 Swiper가 index를 알려주면
                // setViewIndex로 store 업데이트 -> currentView가 바뀌어 도면 뷰 라벨 갱신
                onSlideChange={(swiper) => {
                  setViewIndex(swiper.realIndex);
                }}
              >
                {detailViews.map((view, index) => (
                  <SwiperSlide key={`${view.id}-${index}`}>
                    <img
                      src={view.imageUrl}
                      alt={`${floorPlanName} ${view.view}`}
                      className={clsx(
                        styles.slideImage,
                        isMirror && styles.mirrored
                      )}
                      draggable={false}
                      decoding="async"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {isMultiView && (
                <>
                  <IconButton
                    name="ArrowLeftFill"
                    size="M"
                    aria-label="이전"
                    className={styles.navButtonPrev}
                    onClick={() => swiperRef.current?.slidePrev()}
                  />
                  <IconButton
                    name="ArrowRightFill"
                    size="M"
                    aria-label="다음"
                    className={styles.navButtonNext}
                    onClick={() => swiperRef.current?.slideNext()}
                  />
                </>
              )}
            </div>
          </div>
          <p className={styles.viewLabel}>{currentView.view}</p>
        </div>
      }
      primaryButton={
        <ActionButton size="2XL" fullWidth onClick={onConfirm}>
          공간 선택하기
        </ActionButton>
      }
      secondaryButton={
        <ActionButton
          variant="outlined"
          color="inverse"
          size="2XL"
          leftIcon="FlipHorizontal"
          onClick={toggleMirror}
        >
          좌우반전
        </ActionButton>
      }
    />
  );
};

export default FloorPlanSheet;
