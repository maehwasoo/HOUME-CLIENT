import { useEffect, useRef, useState } from 'react';

/**
 * 범용 스크롤 노출 애니메이션 훅
 * - 특정 요소가 viewport에 들어왔는지 감지한다.
 * - triggerOnce 옵션으로 1회 트리거/반복 트리거를 제어한다.
 */
interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollAnimationOptions = {}
) => {
  /** IntersectionObserver 동작 옵션 기본값 */
  const { threshold = 0.2, rootMargin = '-50px', triggerOnce = true } = options;

  /** 외부에서 사용할 노출 상태와 관찰 대상 ref */
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T>(null);

  /**
   * 요소 viewport 진입/이탈 감지
   * - 진입 시 isVisible=true
   * - triggerOnce=true면 첫 진입 후 관찰 해제
   * - triggerOnce=false면 이탈 시 다시 false
   */
  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(target);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(target);

    /** 컴포넌트 언마운트/옵션 변경 시 관찰 정리 */
    return () => {
      observer.unobserve(target);
    };
  }, [threshold, rootMargin, triggerOnce]);

  /** 뷰에서 바로 사용할 공개 값 */
  return { ref, isVisible };
};

export { useScrollAnimation };
