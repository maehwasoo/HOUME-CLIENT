import { useEffect, useRef, useState } from 'react';

import { overlay } from 'overlay-kit';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate, useNavigate } from 'react-router-dom';

import { useStackDataQuery } from '@pages/generate/v2/apis/queries/useStackDataQuery';
import LikeButton from '@pages/generate/v2/components/likeButton/LikeButton';
import { useGenerateStore } from '@pages/generate/v2/stores/useGenerateStore';
import { useFunnelStore } from '@pages/imageSetup/stores/useFunnelStore';

import { ROUTES } from '@routes/paths';

import { useImageFlowStore } from '@store/useImageFlowStore';

import type { GetCarouselResponseDTO } from '@apis/__generated__/data-contracts';

import TestImg from '@assets/v2/images/TestImg.png';

import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';
import Loading from '@components/loading/Loading';
import { useToast } from '@components/toast/useToast';
import Popup from '@components/v2/popup/Popup';

import { useErrorHandler } from '@hooks/useErrorHandler';
import { useExitBlocker } from '@hooks/useExitBlocker';

import { TOAST_TYPE } from '@/shared/types/toastLegacy';

import { useExitImageFlow } from './hooks/useExitImageFlow';
import { useGenerateImageRequest } from './hooks/useGenerateImageRequest';
import * as styles from './LoadingPage.css';
import ProgressBar from './ProgressBar';
import { usePostCarouselLikeMutation } from '../../apis/mutations/useCarouselLikeMutation';
import Tooltip from '../../components/tooltip/Tooltip';

const ANIMATION_DURATION = 600; // 캐러셀 애니메이션 지속 시간 (ms)

// TODO: 커스텀 훅, 유틸함수로 빼기, 기능 별 커스텀 훅 분할 시급
const LoadingPage = () => {
  const navigate = useNavigate();
  const { handleError } = useErrorHandler('generate');
  const { notify } = useToast();

  // 툴팁
  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  // Zustand store: 이미지 생성 완료 상태 및 결과 데이터
  // TODO: 해당 store는 props로 대체 가능, 없애기
  const { isApiCompleted, navigationData, resetGenerate } = useGenerateStore();

  // 이미지 생성 플로우 이탈 시 sessionStorage/store 정리 핸들러
  // (mutation 응답 전에 사용자가 빠져나가는 경우, store가 그대로 남아 같은 데이터로 mutation이 재실행되는 것을 막기 위함)
  const exitImageFlow = useExitImageFlow();

  // LoadingPage 이탈 가드 — 브라우저 뒤로가기/NavBar 뒤로가기/모바일 스와이프 모두 가로채서 confirm 모달 표시
  // - GENERATE_RESULT, HOME, LOGIN 으로의 navigation은 화이트리스트로 통과
  //   - GENERATE_RESULT: 이미지 생성 정상 완료 시 LoadingPage가 직접 호출하는 redirect (handleProgressComplete)
  //   - HOME: 이탈방지 팝업에서 '나가기'를 선택하면 이동하는 destination, invalid 가드 fallback
  //   - LOGIN: 세션 만료(SESSION_EXPIRED) 시 globalErrorHandler가 강제 redirect — 모달로 막으면 재인증 불가하므로 통과
  useExitBlocker({
    enabled: true,
    shouldBlockNavigation: ({ nextLocation }) => {
      if (
        nextLocation.pathname === ROUTES.GENERATE_RESULT ||
        nextLocation.pathname === ROUTES.HOME ||
        nextLocation.pathname === ROUTES.LOGIN
      ) {
        return false;
      }
      return true;
    },
    onBlocked: ({ reset }) => {
      overlay.open(({ unmount }) => {
        // '계속 기다리기' / backdrop 클릭 -> blocker 'blocked' 상태 해제, LoadingPage에 머무름
        const stay = () => {
          reset();
          unmount();
        };
        // '나가기' -> store/sessionStorage 정리 후 'HOME'으로 이동 (replace: true)
        const exit = () => {
          unmount();
          exitImageFlow();
          reset();
          navigate(ROUTES.HOME, { replace: true });
        };

        return (
          <Popup
            btnStyle="text"
            btnText="생성 기다리기"
            weakBtnText="나가기"
            topIconName="WarningFillDanger"
            onClose={stay}
            onConfirm={stay}
            onCancel={exit}
            content={
              <div className={styles.popupContent}>
                <h3 className={styles.popupTitle}>
                  잠깐! 지금 나가면
                  <br />
                  이미지 생성이 중단돼요.
                </h3>
                <p className={styles.popupDetail}>
                  조금만 더 기다리면 내 취향에 딱 맞는
                  <br />
                  공간을 확인할 수 있어요.
                </p>
              </div>
            }
          />
        );
      });
    },
  });

  // LoadingPage 진입 시 이전 이미지 생성 상태 초기화 (이미지 재생성 시 이전 이미지를 보여주는 버그 방지)
  // useRef로 첫 렌더링 시 동기적으로 실행 -> ProgressBar보다 먼저 초기화
  const hasResetRef = useRef(false);
  if (!hasResetRef.current) {
    resetGenerate();
    hasResetRef.current = true;
  }

  // 진입경로(useImageFlowStore.preset)에 따라 적합한 mutation + payload 결정
  // - 풀퍼널: useFunnelStore 데이터로 풀퍼널 이미지 생성 payload 조립
  // - 숏퍼널: 프리셋 데이터(useImageFlowStore.preset) + 퍼널의 도면 데이터(useFunnelStore.floorPlan)로 배너/다른 스타일로 이미지 생성 payload 조립
  const requestState = useGenerateImageRequest();

  // 이미지 생성 payload에 필요한 데이터가 정상적으로 구성되어 있으면 true
  const isRequestValid = requestState.kind !== 'invalid';

  // 캐러셀 페이지네이션 (무한 스크롤) - 스택 UI
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 캐러셀 애니메이션 상태 - 스택 UI
  const [animating, setAnimating] = useState(false);
  const [frontSlot, setFrontSlot] = useState<'A' | 'B'>('A');
  const [slotAImage, setSlotAImage] = useState<GetCarouselResponseDTO | null>(
    null
  );
  const [slotBImage, setSlotBImage] = useState<GetCarouselResponseDTO | null>(
    null
  );

  // 애니메이션 타이머 정리용 ref
  const transitionTimeoutRef = useRef<number | null>(null);

  const {
    data: currentStack,
    isPending,
    isError,
  } = useStackDataQuery(currentPage, {
    enabled: isRequestValid,
    onSuccess: (data) => {
      setCurrentIndex(0);
      setNextCursor(data.nextCursor ?? undefined);
    },
    onError: (err) => handleError(err, 'loading'),
  });

  const { data: nextStack } = useStackDataQuery(nextCursor, {
    enabled: nextCursor !== undefined && isRequestValid,
  });

  const currentImages = currentStack?.carousels ?? [];
  const nextImages = nextStack?.carousels ?? [];

  // 스택 UI 좋아요 (찜하기 연동됨)
  const { mutate: postLike, isPending: isJjymLoading } =
    usePostCarouselLikeMutation();

  // 진입경로별 mutation 호출 (풀퍼널 / banner / otherStyle / product 분기)
  useEffect(() => {
    const onMutationError = (error: Error) => {
      console.error('이미지 생성 실패:', error);
      handleError(error, 'loading');
    };

    // mutation 응답 시(성공/실패 모두) 퍼널/프리셋 데이터 즉시 정리
    // (이전 입력값이 sessionStorage에 살아있으면 사용자가 /generate URL로 직접 재진입 시 mutation이 재실행되어 같은 요청이 불필요하게 다시 실행됨)
    // - useFunnelStore.reset(): 풀퍼널 분기(preset === null) 차단 — useFunnelStore 데이터 비워서 useGenerateImageRequest가 invalid 반환하도록
    // - preset null: 숏퍼널 분기(preset.type === 'banner'/'style'/'product') 차단
    // - useImageFlowStore의 entryRoute/resultType은 ResultPage에서 사용하므로 유지
    const onMutationSettled = () => {
      useFunnelStore.getState().reset();
      useImageFlowStore.getState().clearPreset();
    };

    const mutateOptions = {
      onError: onMutationError,
      onSettled: onMutationSettled,
    };

    switch (requestState.kind) {
      case 'invalid':
        console.error('invalid requestState kind');
        return;
      case 'fullFunnel':
        requestState.mutate(requestState.payload, mutateOptions);
        return;
      case 'banner':
        requestState.mutate(requestState.payload, mutateOptions);
        return;
      case 'otherStyle':
        requestState.mutate(requestState.payload, mutateOptions);
        return;
      case 'product':
        requestState.mutate(requestState.payload, mutateOptions);
        return;
    }
  }, [handleError, requestState]);

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

  useEffect(() => {
    if (animating) return;
    if (frontSlot === 'A') {
      setSlotAImage(currentImage);
      setSlotBImage(nextImage ?? null);
      return;
    }

    setSlotBImage(currentImage);
    setSlotAImage(nextImage ?? null);
  }, [animating, currentImage, nextImage, frontSlot]);

  const displayCurrentImage = frontSlot === 'A' ? slotAImage : slotBImage;
  const displayNextImage = frontSlot === 'A' ? slotBImage : slotAImage;

  const handleProgressComplete = () => {
    if (!navigationData || !isApiCompleted) return;
    const { imageId, imageUrl, isMirror } = navigationData;
    // STYLE | PRODUCT | BANNER | FULL_FUNNEL
    const viewType = useImageFlowStore.getState().resultType;

    // url에 imageId/viewType, state에 imageUrl/isMirror 전달
    // state.from='loading': ResultPage가 진입 경로를 식별해 뒤로가기 가드를 다르게 적용
    // (loading 경유: 뒤로가기 시 HOME으로 강제 redirect / 마이페이지 경유: 일반 history(-1))
    navigate(
      `${ROUTES.GENERATE_RESULT}?houseId=${imageId}&viewType=${viewType}`,
      {
        replace: true,
        state: { imageUrl, isMirror, from: 'loading' },
      }
    );
  };

  const closeTooltip = () => {
    setIsTooltipOpen(false);
  };

  // 좋아요/별로예요 버튼 클릭 핸들러
  const handleAction = (isLike: boolean) => {
    // 로딩 중 or 투표 중에는 투표(vote) 불가
    if (isPending || isJjymLoading) return;
    if (!displayCurrentImage) return;

    setIsTooltipOpen(false);

    if (isLike) {
      if (displayCurrentImage?.carouselId == null) return;
      postLike(displayCurrentImage.carouselId, {
        onSuccess: () => {
          goToNext();
        },
        onError: () => {
          notify({
            text: '잠시 오류가 발생했어요. 다시 시도해주세요.',
            type: TOAST_TYPE.WARNING,
          });
        },
      });
    } else {
      goToNext();
    }
  };

  // 다음 이미지로 전환
  const goToNext = () => {
    if (animating) return;
    if (!displayNextImage) return;

    setAnimating(true);

    // 기존 타이머 정리
    if (transitionTimeoutRef.current !== null) {
      window.clearTimeout(transitionTimeoutRef.current);
    }

    // 600ms 후 다음 이미지로 전환
    transitionTimeoutRef.current = window.setTimeout(() => {
      setFrontSlot((prev) => (prev === 'A' ? 'B' : 'A'));

      // 현재 페이지에 다음 이미지가 있으면 인덱스 증가
      if (!isLast) {
        setCurrentIndex((prev) => prev + 1);
      }
      // 마지막 이미지면 다음 페이지로 이동
      else {
        if (nextImages && nextImages.length > 0 && nextCursor !== undefined) {
          setCurrentPage(nextCursor);
          setCurrentIndex(0);
        } else {
          // console.log('마지막 페이지 도달');
        }
      }

      setAnimating(false);
      transitionTimeoutRef.current = null;
    }, ANIMATION_DURATION);
  };

  const slotAClassName =
    frontSlot === 'A'
      ? `${styles.currentImageArea} ${animating ? styles.currentImageAreaOut : ''}`
      : `${styles.nextImageArea} ${animating ? styles.nextImageAreaActive : ''}`;

  const slotBClassName =
    frontSlot === 'B'
      ? `${styles.currentImageArea} ${animating ? styles.currentImageAreaOut : ''}`
      : `${styles.nextImageArea} ${animating ? styles.nextImageAreaActive : ''}`;

  // early return
  // store에서 payload 조립 실패 시(직접 URL 접근, 데이터 손실 등) HOME으로 리다이렉트
  // (ImageSetupPage의 entryRoute 가드와 동일하게 HOME fallback)
  if (requestState.kind === 'invalid') {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <main className={styles.pageLayout}>
      <ErrorBoundary FallbackComponent={FeatureErrorFallback}>
        {isPending ? (
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
                  <>
                    {slotAImage?.url && (
                      <div className={slotAClassName}>
                        <img
                          src={slotAImage.url}
                          alt={
                            frontSlot === 'A'
                              ? `현재 가구 이미지 ${slotAImage.carouselId}`
                              : `다음 가구 이미지 ${slotAImage.carouselId}`
                          }
                          className={styles.imageStyle}
                        />
                      </div>
                    )}

                    {slotBImage?.url && (
                      <div className={slotBClassName}>
                        <img
                          src={slotBImage.url}
                          alt={
                            frontSlot === 'B'
                              ? `현재 가구 이미지 ${slotBImage.carouselId}`
                              : `다음 가구 이미지 ${slotBImage.carouselId}`
                          }
                          className={styles.imageStyle}
                        />
                      </div>
                    )}
                  </>
                )}
              </div>
            </section>

            {!hasError && displayCurrentImage && (
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
