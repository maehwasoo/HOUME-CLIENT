import { overlay } from 'overlay-kit';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import Popup from '@components/v2/popup/Popup';

import { useExitBlocker } from '@hooks/useExitBlocker';

import TitleNavBar from '@/shared/components/v2/navBar/TitleNavBar';

import * as styles from './FunnelLayout.css';
import { FUNNEL_STEP_PARAM } from '../../constants/funnel';
import {
  logSelectHouseInfoClickModalContinue,
  logSelectHouseInfoClickModalExit,
  logSelectHouseInfoViewModal,
} from '../../utils/analytics';

type FunnelStepKey = 'FloorPlanSelect' | 'InteriorStyle' | 'ActivityInfo';

// 퍼널 스텝 별 NavBar 타이틀 매핑
const NAVBAR_TITLE_BY_STEP: Record<FunnelStepKey, string> = {
  FloorPlanSelect: '공간 선택하기',
  InteriorStyle: '취향 선택하기',
  ActivityInfo: '가구 선택하기',
};

// step1에서 모달 없이 통과시켜야 하는 라우트
// - LOGIN: 미로그인 사용자가 도면 선택 시 로그인 게이트로 이동하는 케이스
// - GENERATE: 숏퍼널(경로2/4/5)에서 도면 선택 후 바로 이미지 생성으로 이동하는 케이스
const ALLOWED_NEXT_PATHS: string[] = [ROUTES.LOGIN, ROUTES.GENERATE];

interface FunnelLayoutProps {
  children: React.ReactNode;
  currentStep: FunnelStepKey;
}

const FunnelLayout = ({ children, currentStep }: FunnelLayoutProps) => {
  const navigate = useNavigate();
  const isStep1 = currentStep === 'FloorPlanSelect';

  // step1에서만 이탈 가드 활성화
  // NavBar 버튼/브라우저 뒤로가기/모바일 뒤로가기 swipe 모두 useExitBlocker가 가로챔
  useExitBlocker({
    enabled: isStep1, // step1에서 이동할 때만 useBlocker 활성화
    shouldBlockNavigation: ({ currentLocation, nextLocation }) => {
      // 반환값이 true이면 navigation 막음, onBlocked 콜백 호출 (모달 표시)
      // 반환값이 false이면 그냥 통과 -> 라우팅 정상 진행

      // useBlocker가 넘겨주는 currentLocation, nextLocation은 React Router의 Location 객체
      // .pathname='/imageSetup', .search='?image-gen-funnel.step=...'

      // use-funnel에서 페이지 이동 조건:
      // 1-1. pathname 동일 (퍼널 내부 step 이동)
      const isSamePath = currentLocation.pathname === nextLocation.pathname;
      // 1-2. search에 funnel step param 포함 (퍼널 내부에서 다음 step으로 이동)
      const isFunnelStepNav = nextLocation.search.includes(FUNNEL_STEP_PARAM);
      // 1-1, 1-2 둘 다 만족하면 navigation 허용
      if (isSamePath && isFunnelStepNav) return false;

      // 2. 화이트리스트 라우트(LOGIN, GENERATE) -> navigation 허용
      // step1에서 로그인 리다이렉트 or 이미지 생성으로의 navigation은 허용
      if (ALLOWED_NEXT_PATHS.includes(nextLocation.pathname)) return false;

      // 그 외의 경우(step1에서 뒤로가기)에는 onBlocked 콜백 호출
      return true;
    },
    onBlocked: ({ proceed, reset }) => {
      logSelectHouseInfoViewModal();

      // unmount: overlay-kit이 제공, 모달 컴포넌트 제거
      overlay.open(({ unmount }) => {
        // '계속하기' / backdrop 클릭 -> blocker의 'blocked' 상태 해제, 현재 step에 머무름
        const stay = () => {
          logSelectHouseInfoClickModalContinue();
          reset();
          unmount();
        };

        // '나가기' -> 막혔던 navigation(뒤로가기 등)을 그대로 진행
        const exit = () => {
          logSelectHouseInfoClickModalExit();
          unmount();
          proceed();
        };

        return (
          <Popup
            btnStyle="text"
            btnText="계속 입력하기"
            weakBtnText="나가기"
            onClose={stay}
            onConfirm={stay}
            onCancel={exit}
            content={
              <div className={styles.popupContent}>
                <h3 className={styles.popupTitle}>
                  지금 나가면 무료로
                  <br />
                  이미지를 생성할 수 없어요
                </h3>
                <p className={styles.popupDetail}>
                  이 페이지를 떠나면 지금까지 입력한
                  <br />
                  정보와 함께 무료 토큰도 사라져요.
                </p>
              </div>
            }
          />
        );
      });
    },
  });

  return (
    <div className={styles.wrapper}>
      <TitleNavBar
        title={NAVBAR_TITLE_BY_STEP[currentStep]}
        backLabel="이전"
        // step1에서는 navigate(-1) → useExitBlocker가 가로채서 모달 표시
        // step2/step3에서는 undefined → TitleNavBar 기본 동작(navigate(-1))으로 use-funnel history 자연 처리
        onBackClick={isStep1 ? () => navigate(-1) : undefined}
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FunnelLayout;
