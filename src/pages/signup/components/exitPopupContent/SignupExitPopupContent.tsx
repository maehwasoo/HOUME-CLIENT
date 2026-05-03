import Icon from '@components/v2/icon/Icon';

import * as styles from './SignupExitPopupContent.css';

const SignupExitPopupContent = () => {
  return (
    <div className={styles.container}>
      <Icon name="WarningFillDanger" size="32" />
      <h3 className={styles.title}>아직 회원가입이 완료되지 않았어요!</h3>
      <p className={styles.description}>
        지금 나가면 무료로 이미지를 만들 수 있는
        <br />
        토큰 사라져요. 가입을 그만두시겠어요?
      </p>
    </div>
  );
};

export default SignupExitPopupContent;
