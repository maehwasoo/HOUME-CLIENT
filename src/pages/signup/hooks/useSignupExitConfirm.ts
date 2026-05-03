import { useEffect, useRef } from 'react';

interface UseSignupExitConfirmProps {
  enabled?: boolean; // 이탈 방지 기능 여부
  onBackAttempt: () => void;
}

export const useSignupExitConfirm = ({
  enabled = true,
  onBackAttempt,
}: UseSignupExitConfirmProps) => {
  const onBackAttemptRef = useRef(onBackAttempt);
  const isPopupOpenRef = useRef(false);

  useEffect(() => {
    onBackAttemptRef.current = onBackAttempt;
  }, [onBackAttempt]);

  useEffect(() => {
    if (!enabled) return;

    window.history.pushState(null, '', window.location.href);

    // 브라우저 뒤로가기, 앞으로가기, 모바일 스와이프 등 히스토리 이동 발생시
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);

      //팝업 중복 열림 방지
      if (isPopupOpenRef.current) return;

      isPopupOpenRef.current = true;

      onBackAttemptRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [enabled]);

  // 팝업이 닫혔음을 알리는 함수
  const popupClosed = () => {
    isPopupOpenRef.current = false;
  };

  return { popupClosed };
};
