import { overlay } from 'overlay-kit';
import { useNavigate } from 'react-router-dom';

import Popup from '@components/overlay/popup/Popup';

import TitleNavBar from '@/shared/components/v2/navBar/TitleNavBar';

import * as styles from './FunnelLayout.css';
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

interface FunnelLayoutProps {
  children: React.ReactNode;
  currentStep: FunnelStepKey;
}

const FunnelLayout = ({ children, currentStep }: FunnelLayoutProps) => {
  const navigate = useNavigate();

  // TODO: 퍼널 전체 탈출 가드 useBlocker로 바꾸기
  const handleBackClick = () => {
    if (currentStep === 'FloorPlanSelect') {
      logSelectHouseInfoViewModal();

      overlay.open(({ unmount }) => (
        <Popup
          onClose={() => {
            logSelectHouseInfoClickModalContinue();
            unmount();
          }}
          onExit={() => {
            logSelectHouseInfoClickModalExit();
            navigate(-1);
          }}
          title={`지금 나가면 무료로\n 이미지를 생성할 수 없어요`}
          detail={`이 페이지를 떠나면 지금까지 입력한 \n 정보와 함께 무료 토큰도 사라져요.`}
        />
      ));
    }
  };

  return (
    <div className={styles.wrapper}>
      <TitleNavBar
        title={NAVBAR_TITLE_BY_STEP[currentStep]}
        backLabel="이전"
        onBackClick={
          currentStep === 'FloorPlanSelect' ? handleBackClick : undefined
        }
      />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default FunnelLayout;
