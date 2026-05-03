import { useNavigate } from 'react-router-dom';

import { useABTest } from '@pages/generate/hooks/useABTest';
import { useWelcomePageModelPreload } from '@pages/generate/hooks/useWelcomePageModelPreload';
import { logGenerateStartClickBtnCTA } from '@pages/generate/utils/analytics';

import { ROUTES } from '@routes/paths';

import { useUserStore } from '@store/useUserStore';

import KakaoLoginImg from '@assets/v2/images/ImgKakaoLogin.png';

import ActionButton from '@components/v2/button/actionButton/ActionButton';

import { getLoginRedirect, consumeLoginRedirect } from '@utils/loginRedirect';

import * as styles from './WelcomePage.css';

const TOKEN_COUNT = 5;

const WelcomePage = () => {
  // zustand에서 userName 가져오기
  const userName = useUserStore((state) => state.userName);
  const navigate = useNavigate();
  const { variant } = useABTest();

  useWelcomePageModelPreload(); // ONNX 모델 워밍업용 (현재 미사용)

  const redirectPath = getLoginRedirect();
  const isFromMypage = redirectPath?.startsWith(ROUTES.MYPAGE);

  const handleCtaClick = () => {
    logGenerateStartClickBtnCTA(variant);

    if (isFromMypage) {
      // 마이페이지 탭 후 로그인 게이트 진입 및 회원가입 완료 → CTA 탭 시 홈으로 이동
      consumeLoginRedirect();
      navigate(ROUTES.HOME);
    } else {
      // 이미지 생성 중 로그인 게이트 진입 및 회원가입 완료 → CTA 탭 시 이미지 생성 플로우 복귀
      // entryRoute는 useImageFlowStore persist(sessionStorage)로 OAuth redirect에서도 유지됨
      navigate(consumeLoginRedirect() ?? ROUTES.IMAGE_SETUP);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <div className={styles.imgbox}>
          <img src={KakaoLoginImg} alt="회원가입 완료 이미지" />
        </div>
        <div className={styles.textbox}>
          <h1 className={styles.title}>
            {userName ? `${userName}님, 지금 바로` : '하우미님, 지금 바로'}
            <br />집 꾸미기 시작해봐요!
          </h1>
          <p className={styles.content}>
            24시간 동안 무료로 이미지를 생성할 수 있는 <br />
            토큰 {TOKEN_COUNT}개를 선물로 드렸어요.
          </p>
        </div>
      </div>
      <div className={styles.btnarea}>
        <ActionButton onClick={handleCtaClick} fullWidth>
          이미지 생성 시작하기
        </ActionButton>
      </div>
    </div>
  );
};

export default WelcomePage;
