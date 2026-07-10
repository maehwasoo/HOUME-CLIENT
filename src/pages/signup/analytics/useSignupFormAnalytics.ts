import { useEffect, useRef } from 'react';

import {
  trackSignupBrowserBackClick,
  trackSignupBrowserBackSwipe,
  trackSignupErrorBirthIncorrectView,
  trackSignupErrorBirthUnder14View,
  trackSignupErrorNickNumView,
  trackSignupErrorNickSignView,
} from '@pages/signup/analytics/signupFormAnalytics';
import { getSignupStep } from '@pages/signup/utils/getSignupStep';

import { GA_EVENTS } from '@shared/analytics/events';
import { useAnalyticsPageView } from '@shared/analytics/hooks';
import { SCREEN_NAME } from '@shared/analytics/screenNames';
import { getLoginSocialParams } from '@shared/analytics/utils/loginEntryRoute';

import type { BlockerFunction } from 'react-router-dom';

/** iOS 뒤로가기 제스처 휴리스틱 — 화면 왼쪽 가장자리에서 오른쪽으로 스와이프 */
const SWIPE_START_MAX_X = 50;
const SWIPE_MIN_DELTA_X = 80;
const SWIPE_MAX_DELTA_Y = 50;

/** react-router `HistoryAction`은 export되지 않아 Blocker 인자에서 추론 */
type NavigationHistoryAction = Parameters<BlockerFunction>[0]['historyAction'];

interface UseSignupFormAnalyticsOptions {
  enabled: boolean;
  isNameSectionValid: boolean;
  isNameSubmitted: boolean;
  isBirthSectionValid: boolean;
  isNameFormatInvalid: boolean;
  isNameLengthInvalid: boolean;
  yearFormatError: boolean;
  yearAgeError: boolean;
  monthFieldError: boolean;
  dayFieldError: boolean;
}

/**
 * 회원가입 폼 GA — page_view, 에러 view, 브라우저 뒤로가기(click/swipe) 전송.
 * `signupStep`·`trackBrowserBack`은 SignupPage 이탈 가드에 연결.
 */
export const useSignupFormAnalytics = ({
  enabled,
  isNameSectionValid,
  isNameSubmitted,
  isBirthSectionValid,
  isNameFormatInvalid,
  isNameLengthInvalid,
  yearFormatError,
  yearAgeError,
  monthFieldError,
  dayFieldError,
}: UseSignupFormAnalyticsOptions) => {
  /** touchend 직후 POP이 오면 swipe, 아니면 click으로 분기 */
  const backGestureRef = useRef<'click' | 'swipe' | null>(null);
  /** 동일 에러 메시지 view 이벤트 중복 전송 방지 */
  const trackedErrorsRef = useRef(new Set<string>());

  const signupStep = getSignupStep({
    isNameSectionValid,
    isNameSubmitted,
    isBirthSectionValid,
  });

  useAnalyticsPageView(
    GA_EVENTS.signupForm.PAGE_VIEW,
    SCREEN_NAME.SIGNUP_FORM,
    getLoginSocialParams(),
    { enabled }
  );

  useEffect(() => {
    if (!enabled) return;

    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touch = event.changedTouches[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartX;
      const deltaY = Math.abs(touch.clientY - touchStartY);

      if (
        touchStartX <= SWIPE_START_MAX_X &&
        deltaX >= SWIPE_MIN_DELTA_X &&
        deltaY <= SWIPE_MAX_DELTA_Y
      ) {
        backGestureRef.current = 'swipe';
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled || !isNameFormatInvalid) return;
    if (trackedErrorsRef.current.has('nickSign')) return;

    trackedErrorsRef.current.add('nickSign');
    trackSignupErrorNickSignView();
  }, [enabled, isNameFormatInvalid]);

  useEffect(() => {
    if (!enabled || !isNameLengthInvalid) return;
    if (trackedErrorsRef.current.has('nickNum')) return;

    trackedErrorsRef.current.add('nickNum');
    trackSignupErrorNickNumView();
  }, [enabled, isNameLengthInvalid]);

  useEffect(() => {
    if (!enabled || !yearAgeError) return;
    if (trackedErrorsRef.current.has('birthUnder14')) return;

    trackedErrorsRef.current.add('birthUnder14');
    trackSignupErrorBirthUnder14View();
  }, [enabled, yearAgeError]);

  // 만 14세 미만 에러가 우선 — 동시에 birthIncorrect view는 보내지 않음
  useEffect(() => {
    if (!enabled || yearAgeError) return;

    const hasBirthFormatError =
      yearFormatError || monthFieldError || dayFieldError;
    if (!hasBirthFormatError) return;
    if (trackedErrorsRef.current.has('birthIncorrect')) return;

    trackedErrorsRef.current.add('birthIncorrect');
    trackSignupErrorBirthIncorrectView();
  }, [dayFieldError, enabled, monthFieldError, yearAgeError, yearFormatError]);

  /** useExitBlocker shouldBlock 콜백에서 historyAction 전달 */
  const trackBrowserBack = (historyAction: NavigationHistoryAction) => {
    const gesture = backGestureRef.current ?? 'click';
    backGestureRef.current = null;

    if (historyAction !== 'POP') return;

    if (gesture === 'swipe') {
      trackSignupBrowserBackSwipe(signupStep);
      return;
    }

    trackSignupBrowserBackClick(signupStep);
  };

  /** useBrowserBackTrap 등 브라우저 뒤로가기 직접 가로채기 시 사용 */
  const trackBrowserBackPop = () => {
    const gesture = backGestureRef.current ?? 'click';
    backGestureRef.current = null;

    if (gesture === 'swipe') {
      trackSignupBrowserBackSwipe(signupStep);
      return;
    }

    trackSignupBrowserBackClick(signupStep);
  };

  return {
    signupStep,
    trackBrowserBack,
    trackBrowserBackPop,
  };
};
