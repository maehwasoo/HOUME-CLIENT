import { useState, useEffect, useRef } from 'react';

import { overlay } from 'overlay-kit';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useDeleteResultPreferenceMutation } from '@pages/generate/apis/mutations/useDeleteResultPreferenceMutation';
import { useFactorPreferenceMutation } from '@pages/generate/apis/mutations/useFactorPreferenceMutation';
import { useResultPreferenceMutation } from '@pages/generate/apis/mutations/useResultPreferenceMutation';
import { useFactorsQuery } from '@pages/generate/apis/queries/useFactorsQuery';
import type {
  GenerateImageData,
  ResultPageLikeState,
} from '@pages/generate/types/generate';

import SlideNext from '@assets/icons/nextAbled.svg?react';
import SlideNextDisabled from '@assets/icons/nextDisabled.svg?react';
import SlidePrev from '@assets/icons/prevAbled.svg?react';
import SlidePrevDisabled from '@assets/icons/prevDisabled.svg?react';
import generateResultLockedPreview from '@assets/images/generateResultLockedPreview.png';

import DislikeButton from '@components/button/likeButton/DislikeButton';
import LikeButton from '@components/button/likeButton/LikeButton';
import CommunityComingSoonModal from '@components/overlay/modal/CommunityComingSoonModal';

import * as styles from './GeneratedImg.css';

import type { Swiper as SwiperType } from 'swiper';

export interface GeneratedImgCurationProps {
  /** 다중 생성 이미지 (스와이퍼 슬라이드) */
  images: GenerateImageData[];
  onSlideChange?: (currentIndex: number) => void;
  onCurrentImgIdChange?: (currentImgId: number) => void;
  isSlideCountLoading?: boolean;
}

/**
 * v2 큐레이션 결과 — 다중 이미지 + Swiper + 잠금 프리뷰 슬라이드 (DetectionHotspots 없이 표시만)
 */
const GeneratedImg = ({
  images,
  onSlideChange,
  onCurrentImgIdChange,
  isSlideCountLoading = false,
}: GeneratedImgCurationProps) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentImgId, setCurrentImgId] = useState(0);
  const [lockedPreference, setLockedPreference] =
    useState<ResultPageLikeState>(null);
  const [selectedFactorId, setSelectedFactorId] = useState<number | null>(null);
  const [isPreferenceSubmitting, setIsPreferenceSubmitting] = useState(false);
  const [isFactorSubmitting, setIsFactorSubmitting] = useState(false);
  const factorRequestSeqRef = useRef(0);
  const lockedPreferenceRef = useRef<ResultPageLikeState>(lockedPreference);
  const { mutate: sendPreference } = useResultPreferenceMutation();
  const { mutate: deletePreference } = useDeleteResultPreferenceMutation();
  const { mutate: sendFactorPreference } = useFactorPreferenceMutation();
  const { data: likeFactorsData = [] } = useFactorsQuery(true, {
    enabled: lockedPreference === 'like',
  });
  const { data: dislikeFactorsData = [] } = useFactorsQuery(false, {
    enabled: lockedPreference === 'dislike',
  });

  useEffect(() => {
    onCurrentImgIdChange?.(currentImgId);
  }, [currentImgId, onCurrentImgIdChange]);

  useEffect(() => {
    lockedPreferenceRef.current = lockedPreference;
  }, [lockedPreference]);

  useEffect(() => {
    const newImgId = images[currentSlideIndex]?.imageId;
    setCurrentImgId(newImgId ?? 0);
  }, [currentSlideIndex, images]);

  const lastImage = images[images.length - 1];
  const totalSlideCount = lastImage ? images.length + 1 : images.length;
  const isPrevDisabled = !swiper || currentSlideIndex === 0;
  const isNextDisabled = !swiper || currentSlideIndex === totalSlideCount - 1;
  const isLockedSlide = lastImage
    ? currentSlideIndex === totalSlideCount - 1
    : false;

  const submitPreference = (
    imageId: number,
    finalState: Exclude<ResultPageLikeState, null>
  ) => {
    sendPreference(
      { imageId, isLike: finalState === 'like' },
      {
        onSuccess: () => {
          setLockedPreference(finalState);
          setSelectedFactorId(null);
        },
        onSettled: () => setIsPreferenceSubmitting(false),
      }
    );
  };

  const handleLockedPreference = (isLike: boolean) => {
    const imageId = lastImage?.imageId;
    if (!imageId || isPreferenceSubmitting || isFactorSubmitting) return;

    const nextState: ResultPageLikeState = isLike ? 'like' : 'dislike';
    const finalState: ResultPageLikeState =
      lockedPreference === nextState ? null : nextState;

    setIsPreferenceSubmitting(true);

    if (finalState === null) {
      deletePreference(imageId, {
        onSuccess: () => {
          setLockedPreference(null);
          setSelectedFactorId(null);
        },
        onSettled: () => setIsPreferenceSubmitting(false),
      });
      return;
    }

    if (lockedPreference !== null && lockedPreference !== finalState) {
      if (selectedFactorId !== null) {
        const previousFactorId = selectedFactorId;
        setSelectedFactorId(null);
        sendFactorPreference(
          {
            imageId,
            factorId: previousFactorId,
          },
          {
            onSettled: () => {
              submitPreference(imageId, finalState);
            },
          }
        );
        return;
      }
    }

    submitPreference(imageId, finalState);
  };

  const handleFactorClick = (factorId: number) => {
    const imageId = lastImage?.imageId;
    if (!imageId || isFactorSubmitting || isPreferenceSubmitting) return;

    const isSelected = selectedFactorId === factorId;
    const expectedPreference = lockedPreference;
    const requestSeq = factorRequestSeqRef.current + 1;
    factorRequestSeqRef.current = requestSeq;
    setIsFactorSubmitting(true);

    sendFactorPreference(
      { imageId, factorId },
      {
        onSuccess: () => {
          if (factorRequestSeqRef.current !== requestSeq) return;
          if (lockedPreferenceRef.current !== expectedPreference) return;
          setSelectedFactorId(isSelected ? null : factorId);
        },
        onSettled: () => {
          if (factorRequestSeqRef.current !== requestSeq) return;
          setIsFactorSubmitting(false);
        },
      }
    );
  };

  const handleOpenModal = () => {
    overlay.open(({ unmount }) => {
      const closeModal = () => {
        unmount();
      };

      return <CommunityComingSoonModal onClose={closeModal} />;
    });
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sliderArea}>
        <Swiper
          slidesPerView={1}
          onSlideChange={(swiperInstance) => {
            const newIndex = swiperInstance.activeIndex;
            setCurrentSlideIndex(newIndex);
            onSlideChange?.(newIndex);
          }}
          onSwiper={setSwiper}
        >
          <div className={styles.slideNum} aria-live="polite">
            {isSlideCountLoading ? (
              <div
                className={styles.slideNumSkeleton}
                aria-hidden="true"
                role="presentation"
              />
            ) : (
              <>
                <span>{currentSlideIndex + 1}</span>
                <span>/</span>
                <span>{totalSlideCount}</span>
              </>
            )}
          </div>
          <button
            type="button"
            onClick={() => swiper?.slidePrev()}
            className={styles.slidePrevBtn}
            disabled={isPrevDisabled}
          >
            <span className={styles.slideNavIconFrame}>
              {isPrevDisabled ? <SlidePrevDisabled /> : <SlidePrev />}
            </span>
          </button>
          {images.map((image, index) => (
            <SwiperSlide
              key={`${image.imageId}-${index}`}
              className={styles.swiperSlide}
            >
              <img
                src={image.imageUrl}
                alt=""
                loading="lazy"
                decoding="async"
                className={styles.imgArea({ mirrored: image.isMirror })}
              />
            </SwiperSlide>
          ))}
          {lastImage && (
            <SwiperSlide key="locked-preview" className={styles.swiperSlide}>
              <img
                src={generateResultLockedPreview}
                alt=""
                className={styles.lockedPreviewImg}
              />
              <div className={styles.lockWrapper}>
                <div className={styles.lockTextBox}>
                  <p>나와 취향이 비슷한</p>
                  <p>유저들이 만든 이미지도 궁금하신가요?</p>
                </div>
                <button
                  type="button"
                  className={styles.moreBtn}
                  onClick={handleOpenModal}
                >
                  이미지 더보기
                </button>
              </div>
            </SwiperSlide>
          )}
          <button
            type="button"
            onClick={() => swiper?.slideNext()}
            className={styles.slideNextBtn}
            disabled={isNextDisabled}
          >
            <span className={styles.slideNavIconFrame}>
              {isNextDisabled ? <SlideNextDisabled /> : <SlideNext />}
            </span>
          </button>
        </Swiper>
      </div>
      {isLockedSlide && (
        <section className={styles.feedbackSection}>
          <div className={styles.feedbackBox}>
            <p className={styles.feedbackTitle}>
              생성된 이미지가 만족스러우신가요?
            </p>
            <div className={styles.feedbackButtonGroup}>
              <LikeButton
                typeVariant="onlyIcon"
                isSelected={lockedPreference === 'like'}
                disabled={isPreferenceSubmitting || isFactorSubmitting}
                onClick={() => handleLockedPreference(true)}
                aria-label="이미지 좋아요 버튼"
              />
              <DislikeButton
                typeVariant="onlyIcon"
                isSelected={lockedPreference === 'dislike'}
                disabled={isPreferenceSubmitting || isFactorSubmitting}
                onClick={() => handleLockedPreference(false)}
                aria-label="이미지 싫어요 버튼"
              />
            </div>
            {lockedPreference === 'like' && likeFactorsData.length > 0 && (
              <div className={styles.feedbackTagGroup}>
                <div className={styles.feedbackTagRow}>
                  {likeFactorsData.slice(0, 2).map((factor) => (
                    <button
                      type="button"
                      key={factor.id}
                      className={`${styles.feedbackTagButton} ${
                        selectedFactorId === factor.id
                          ? styles.feedbackTagButtonSelected
                          : ''
                      }`}
                      onClick={() => handleFactorClick(factor.id)}
                      disabled={isFactorSubmitting || isPreferenceSubmitting}
                    >
                      {factor.text}
                    </button>
                  ))}
                </div>
                <div className={styles.feedbackTagRow}>
                  {likeFactorsData.slice(2, 4).map((factor) => (
                    <button
                      type="button"
                      key={factor.id}
                      className={`${styles.feedbackTagButton} ${
                        selectedFactorId === factor.id
                          ? styles.feedbackTagButtonSelected
                          : ''
                      }`}
                      onClick={() => handleFactorClick(factor.id)}
                      disabled={isFactorSubmitting || isPreferenceSubmitting}
                    >
                      {factor.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {lockedPreference === 'dislike' &&
              dislikeFactorsData.length > 0 && (
                <div className={styles.feedbackTagGroup}>
                  <div className={styles.feedbackTagRow}>
                    {dislikeFactorsData.slice(0, 2).map((factor) => (
                      <button
                        type="button"
                        key={factor.id}
                        className={`${styles.feedbackTagButton} ${
                          selectedFactorId === factor.id
                            ? styles.feedbackTagButtonSelected
                            : ''
                        }`}
                        onClick={() => handleFactorClick(factor.id)}
                        disabled={isFactorSubmitting || isPreferenceSubmitting}
                      >
                        {factor.text}
                      </button>
                    ))}
                  </div>
                  <div className={styles.feedbackTagRow}>
                    {dislikeFactorsData.slice(2, 4).map((factor) => (
                      <button
                        type="button"
                        key={factor.id}
                        className={`${styles.feedbackTagButton} ${
                          selectedFactorId === factor.id
                            ? styles.feedbackTagButtonSelected
                            : ''
                        }`}
                        onClick={() => handleFactorClick(factor.id)}
                        disabled={isFactorSubmitting || isPreferenceSubmitting}
                      >
                        {factor.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}
          </div>
        </section>
      )}
    </div>
  );
};

export default GeneratedImg;
