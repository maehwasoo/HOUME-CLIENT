import { useEffect, useMemo, useRef, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useNavigate } from 'react-router-dom';

import { useFallbackImageQuery } from '@pages/generate/apis/queries/useFallbackImageQuery';
import { usePostCarouselLikeMutation } from '@pages/generate/v2/apis/mutations/useCarouselLikeMutation';
import { useStackDataQuery } from '@pages/generate/v2/apis/queries/useStackDataQuery';
import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';
import type { GenerateImageRequest } from '@pages/generate/v2/types/generate';

import { ROUTES } from '@routes/paths';

import { TOAST_TYPE } from '@shared/types/toast';

import TestImg from '@assets/v2/images/TestImg.png';

import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';
import Loading from '@components/loading/Loading';
import { useToast } from '@components/toast/useToast';

// import { ERROR_CODES, FALLBACK_TRIGGER_CODES } from '@constants/apiErrorCode';

import { useErrorHandler } from '@hooks/useErrorHandler';

import * as styles from './LoadingPage.css';
import ProgressBar from './ProgressBar';
import LikeButton from '../../components/likeButton/LikeButton';
import Tooltip from '../../components/tooltip/Tooltip';

const ANIMATION_DURATION = 600; // 캐러셀 애니메이션 지속 시간 (ms)
const SESSION_STORAGE_KEY = 'generate_image_request'; // sessionStorage 키

// Type Guard: GenerateImageRequest 검증
// sessionStorage에서 가져온 데이터 검증
const isValidGenerateImageRequest = (
  value: unknown
): value is GenerateImageRequest => {
  if (!value || typeof value !== 'object') return false;

  const request = value as Record<string, unknown>;
  const floorPlan = request.floorPlan as Record<string, unknown> | undefined;

  return (
    typeof request.houseId === 'number' &&
    typeof request.equilibrium === 'string' &&
    typeof request.activity === 'string' &&
    Array.isArray(request.moodBoardIds) &&
    (request.moodBoardIds as unknown[]).every((n) => typeof n === 'number') &&
    Array.isArray(request.selectiveIds) &&
    (request.selectiveIds as unknown[]).every((n) => typeof n === 'number') &&
    floorPlan !== undefined &&
    typeof floorPlan === 'object' &&
    typeof floorPlan.floorPlanId === 'number' &&
    typeof floorPlan.isMirror === 'boolean'
  );
};

// TODO: 커스텀 훅, 유틸함수로 빼기, 기능 별 커스텀 훅 분할 시급
const LoadingPage = () => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler('generate');
  const { notify } = useToast();

  // 툴팁
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  // Zustand store: 이미지 생성 완료 상태 및 결과 데이터
  const { isApiCompleted, navigationData, resetGenerate } = useGenerateStore();

  // LoadingPage 진입 시 이전 이미지 생성 상태 초기화 (이미지 재생성 시 이전 이미지를 보여주는 버그 방지)
  // useRef로 첫 렌더링 시 동기적으로 실행 -> ProgressBar보다 먼저 초기화
  const hasResetRef = useRef(false);
  if (!hasResetRef.current) {
    resetGenerate();
    hasResetRef.current = true;
  }

  // sessionStorage에서 이미지 생성 요청 데이터 가져오기
  const requestData: GenerateImageRequest | null = useMemo(() => {
    // useMemo로 파싱 결과 참조 고정해 렌더 시 불필요한 API 재호출 차단
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) return null;

    try {
      const parsed = JSON.parse(stored);
      return isValidGenerateImageRequest(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }, []);

  // 정상 진입 여부, true: 일반 이미지 생성 API 호출, false: 폴백 이미지 API 호출
  const [isNormalEntry, setIsNormalEntry] = useState(true);
  console.log(setIsNormalEntry, 'isNormalEntry 상태 업데이트 함수'); // 빌드 에러 방지용

  // 폴백 이미지 생성 API (일반 API 실패 시 사용)
  // isNormalEntry가 변경되면 컴포넌트 리렌더링 -> useFallbackImageQuery 실행 -> useQuery가 enabled값 감지
  // -> true: 폴백 API 요청, false: 쿼리 실행 X
  useFallbackImageQuery(requestData?.houseId || 0, !isNormalEntry, (error) => {
    handleError(error, 'loading');
  });

  // 캐러셀 페이지네이션 (무한 스크롤) - 스택 UI
  const [currentPage, setCurrentPage] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 스택 UI 투표 중 상태
  const [isVoting, setIsVoting] = useState(false);

  // 캐러셀 애니메이션 상태 - 스택 UI
  const [animating, setAnimating] = useState(false);

  // 애니메이션 타이머 정리용 ref
  const transitionTimeoutRef = useRef<number | null>(null);

  const {
    data: currentImages,
    isPending,
    isError,
  } = useStackDataQuery(currentPage, {
    enabled: !!requestData, // requestData가 있을 때만 활성화
    onSuccess: () => setCurrentIndex(0), // 새 페이지 로드 시 첫 이미지부터 시작
    onError: (err) => handleError(err, 'loading'),
  });

  const { data: nextImages } = useStackDataQuery(currentPage + 1, {
    enabled: !!currentImages && !!requestData,
  });

  const likeMutation = usePostCarouselLikeMutation();

  // 테스트용
  const shouldShowLoading = !!requestData && isPending;

  // mutateGenerateImage는 A/B 테스트 시절 이미지 생성
  // useEffect(() => {
  //   if (!requestData) return;

  //   mutateGenerateImage(requestData, {
  //     onSuccess: () => {
  //       // 성공 시 navigationData 설정, 프로그래스 바 완료 후 페이지 이동
  //     },
  //     onError: (error: any) => {
  //       const errorCode = error?.response?.data?.code;
  //       const errorStatus = error?.response?.status;

  //       // rate limit 또는 이미지 생성 관련 에러: 폴백 API로 전환
  //       if (
  //         errorStatus === ERROR_CODES.HTTP_RATE_LIMITED ||
  //         FALLBACK_TRIGGER_CODES.has(errorCode)
  //       ) {
  //         setIsNormalEntry(false); // 폴백 API 활성화
  //       }
  //       // 기타 에러: 일반 에러 처리
  //       else {
  //         console.error('이미지 생성 실패:', error);
  //         handleError(error, 'loading');
  //       }
  //     },
  //   });
  // }, [handleError, mutateGenerateImage, requestData]);

  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, []);

  const hasError =
    isError ||
    (!isPending && !currentImages) ||
    !currentImages ||
    currentImages.length === 0;

  // 정상 데이터(normal data)일 때 현재/다음 이미지 계산
  const currentImage = hasError ? null : currentImages[currentIndex];

  const isLast = hasError ? false : currentIndex === currentImages.length - 1;

  const nextImage = hasError
    ? null
    : !isLast
      ? currentImages[currentIndex + 1]
      : nextImages && nextImages.length > 0
        ? nextImages[0]
        : undefined;

  const handleProgressComplete = () => {
    if (navigationData && isApiCompleted) {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      navigate(ROUTES.GENERATE_RESULT, {
        state: {
          result: navigationData,
        },
        replace: true,
      });
    }
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  // 좋아요/별로예요 버튼 클릭 핸들러
  const handleAction = (isLike: boolean) => {
    // 로딩 중 or 투표 중에는 투표(vote) 불가
    if (isPending || isVoting) return;
    if (!currentImage) return;

    setIsTooltipOpen(false);
    setIsVoting(true);

    if (isLike) {
      // API 호출: 좋아요 전송
      likeMutation.mutate(currentImage.rawProductId, {
        onSuccess: () => {
          goToNext();
        },
        onError: () => {
          notify({
            text: '잠시 오류가 발생했어요. 다시 시도해주세요.',
            type: TOAST_TYPE.WARNING,
          });
          setIsVoting(false);
        },
      });
    } else {
      goToNext();
    }
  };

  // 다음 이미지로 전환
  const goToNext = () => {
    setAnimating(true);

    // 기존 타이머 정리
    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    // 600ms 후 다음 이미지로 전환
    transitionTimeoutRef.current = window.setTimeout(() => {
      // 현재 페이지에 다음 이미지가 있으면 인덱스 증가
      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      }
      // 마지막 이미지면 다음 페이지로 이동
      else {
        if (nextImages && nextImages.length > 0) {
          setCurrentPage((prev) => prev + 1);
          setCurrentIndex(0);
        } else {
          // console.log('마지막 페이지 도달');
        }
      }

      setAnimating(false);
      setIsVoting(false);
      transitionTimeoutRef.current = null;
    }, ANIMATION_DURATION);
  };

  // early return
  // requestData가 없으면 IMAGE_SETUP으로 리다이렉트
  if (!requestData) {
    return <Navigate to={ROUTES.IMAGE_SETUP} replace />;
  }

  return (
    <main className={styles.pageLayout}>
      <ErrorBoundary FallbackComponent={FeatureErrorFallback}>
        {shouldShowLoading ? ( // 여기 테스트용으로 바꿈 원래는 isPending
          <Loading />
        ) : (
          <div className={styles.wrapper}>
            <ProgressBar onComplete={handleProgressComplete} />

            <section className={styles.carouselSection}>
              <div className={styles.imageContainer}>
                {hasError ? (
                  <div className={styles.currentImageArea}>
                    {/* 임시로 에러일 때 이미지 */}
                    <img
                      src={TestImg}
                      alt="기본 가구 이미지"
                      className={styles.imageStyle}
                    />
                  </div>
                ) : (
                  // 에러 상황: 에러 메시지 표시
                  // <div className={styles.errorMessage}>
                  //   <p>이미지를 불러올 수 없습니다</p>
                  // </div>
                  // 정상 상황: 이미지 캐러셀 표시
                  <>
                    {nextImage && (
                      <div
                        key={`next-${currentPage + 1}-${nextImage.rawProductId}`}
                        className={`${styles.nextImageArea} ${
                          animating ? styles.nextImageAreaActive : ''
                        }`}
                      >
                        <img
                          src={nextImage.url}
                          alt={`다음 가구 이미지 ${nextImage.rawProductId}`}
                          className={styles.imageStyle}
                        />
                      </div>
                    )}

                    {currentImage && (
                      <div
                        key={`current-${currentPage}-${currentImage.rawProductId}`}
                        className={`${styles.currentImageArea} ${
                          animating ? styles.currentImageAreaOut : ''
                        }`}
                      >
                        <img
                          src={currentImage.url}
                          alt={`현재 가구 이미지 ${currentImage.rawProductId}`}
                          className={styles.imageStyle}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {!hasError && currentImage && (
              <div className={styles.buttonGroup}>
                <LikeButton
                  name="dislike"
                  onClick={() => handleAction(false)}
                />
                <Tooltip
                  content="마음에 드는 상품을 선택하면 찜한 상품에 추가돼요!"
                  isOpen={isTooltipOpen}
                  onClose={closeTooltip}
                >
                  <LikeButton name="like" onClick={() => handleAction(true)} />
                </Tooltip>
              </div>
            )}
          </div>
        )}
      </ErrorBoundary>
    </main>
  );
};

export default LoadingPage;
