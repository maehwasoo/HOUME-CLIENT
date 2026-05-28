import { useEffect, useRef, useState } from 'react';

import { overlay } from 'overlay-kit';
import { useLocation, useNavigate } from 'react-router-dom';

import { ROUTES } from '@routes/paths';

import ActionButton from '@components/v2/button/actionButton/ActionButton';
import Chip from '@components/v2/chip/Chip';
import Icon from '@components/v2/icon/Icon';
import Popup from '@components/v2/popup/Popup';
import DateField from '@components/v2/userFormField/DateField';
import TextField from '@components/v2/userFormField/TextField';

import { ERROR_MESSAGES } from '@constants/clientErrorMessage';

import { useExitBlocker } from '@hooks/useExitBlocker';
import { useRandomNickname } from '@hooks/useGetRandomNickname';
import useUserForm from '@hooks/useUserForm';

import { usePostSignupMutation } from './apis/mutations/usePostSignupMutation';
import SignupExitPopupContent from './components/exitPopupContent/SignupExitPopupContent';
import * as styles from './SignupPage.css';
import {
  logSignupFormClickBtnCTA,
  logSignupFormViewError,
} from './utils/analytics';

interface SignupLocationState {
  signupToken?: string | null;
}

// Type Guard: SignupLocationState 검증
const isSignupLocationState = (
  value: unknown
): value is SignupLocationState => {
  if (!value || typeof value !== 'object') return false;

  const state = value as Record<string, unknown>;
  if (!('signupToken' in state)) return false;

  const signupToken = state.signupToken;
  return signupToken == null || typeof signupToken === 'string';
};

const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialized = useRef(false);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);
  const [isNameSubmitted, setIsNameSubmitted] = useState(false);

  const routeSignupToken = isSignupLocationState(location.state)
    ? (location.state.signupToken ?? null)
    : null;
  const signupToken = routeSignupToken ?? sessionStorage.getItem('signupToken');

  useEffect(() => {
    if (routeSignupToken) {
      sessionStorage.setItem('signupToken', routeSignupToken);
    }
  }, [routeSignupToken]);

  useEffect(() => {
    if (!signupToken) {
      navigate(ROUTES.LOGIN, { replace: true });
    }
  }, [signupToken, navigate]);

  // 이탈 방지 팝업 (NavBar 뒤로가기/브라우저 뒤로가기/모바일 뒤로가기 스와이프 모두 가로챔)
  // signupToken이 없으면 useEffect가 LOGIN으로 redirect하므로 가드 비활성화
  useExitBlocker({
    enabled: !!signupToken,
    shouldBlockNavigation: ({ nextLocation }) => {
      if (nextLocation.pathname === ROUTES.WELCOME) return false;
      return true;
    },
    onBlocked: ({ proceed, reset }) => {
      overlay.open(({ unmount }) => {
        const close = () => {
          reset();
          unmount();
        };

        return (
          <Popup
            btnStyle="text"
            btnText="계속하기"
            weakBtnText="그만두기"
            onClose={close}
            onConfirm={close}
            onCancel={() => {
              unmount();
              // 모달 unmount 직후 proceed → 사용자가 시도한 navigation(뒤로가기 등) 진행
              // KakaoCallback이 replace로 history에 안 남으므로 자연스럽게 /login(또는 진입점)으로 이동
              proceed();
            }}
            content={<SignupExitPopupContent />}
          />
        );
      });
    },
  });

  const {
    nickname,
    birthYear,
    birthMonth,
    birthDay,
    gender,
    handleNicknameChange,
    handleBirthYearChange,
    handleBirthMonthChange,
    handleBirthDayChange,
    setGender,
    isNameFormatInvalid,
    isNameLengthInvalid,
    yearFormatError,
    yearAgeError,
    monthFieldError,
    dayFieldError,
    isFormValid,
    hasError,
  } = useUserForm();

  const { mutate: signUp } = usePostSignupMutation();

  // 랜덤 닉네임 GET 쿼리
  const { randomNickname, refresh } = useRandomNickname(handleNicknameChange);

  // 닉네임 필드 유효
  const isNameSectionValid =
    nickname !== '' && !isNameFormatInvalid && !isNameLengthInvalid;

  // 닉네임이 유효하지 않으면 isNameSubmitted 초기화
  useEffect(() => {
    if (!isNameSectionValid) {
      setIsNameSubmitted(false);
    }
  }, [isNameSectionValid]);

  // 페이지 로드 시 랜덤 닉네임으로 초기값 설정 (첫 마운트, 랜덤닉네임 존재, 초기화 전)
  useEffect(() => {
    if (randomNickname && !isInitialized.current && nickname === '') {
      handleNicknameChange(randomNickname);
      isInitialized.current = true;

      // 닉네임 들어온 뒤 포커스 처리
      const el = nicknameRef.current;
      if (el) {
        el.focus();
        el.setSelectionRange(el.value.length, el.value.length);
      }
    }
  }, [randomNickname, nickname, handleNicknameChange]);

  const errorSentRef = useRef(false);

  // 에러가 표시될 때 이벤트 전송 (최초 1회)
  useEffect(() => {
    if (hasError && !errorSentRef.current) {
      logSignupFormViewError();
      errorSentRef.current = true;
    } else if (!hasError) {
      // 에러가 사라지면 ref 초기화 (다시 에러가 발생하면 이벤트 전송)
      errorSentRef.current = false;
    }
  }, [hasError]);

  // 닉네임 Enter시
  const handleNicknameEnter = () => {
    if (isNameSectionValid) {
      setIsNameSubmitted(true);
    }
  };

  // 생년월일 필드 렌더링된 직후 감지해 포커싱
  useEffect(() => {
    if (isNameSubmitted && isNameSectionValid) {
      yearRef.current?.focus();
    }
  }, [isNameSubmitted, isNameSectionValid]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // CTA 버튼 클릭 시 GA 이벤트 전송
    logSignupFormClickBtnCTA();

    if (!isFormValid || !gender || !signupToken) return;

    const formattedBirthday = `${birthYear}-${birthMonth}-${birthDay}`;

    signUp({
      signupToken,
      nickname,
      gender: gender,
      birthday: formattedBirthday,
    });
  };

  if (!signupToken) return null;

  // 생년월일 필드 유효
  const isBirthSectionValid =
    birthYear !== '' &&
    birthMonth !== '' &&
    birthDay !== '' &&
    !yearFormatError &&
    !yearAgeError &&
    !monthFieldError &&
    !dayFieldError;

  // 닉네임 에러 메시지
  const nameErrorMessage = (() => {
    if (isNameFormatInvalid) return ERROR_MESSAGES.NAME_INVALID;
    if (isNameLengthInvalid) return ERROR_MESSAGES.LENGTH_INVALID;
    return '';
  })();

  // 생년월일 에러 메시지
  const birthErrorMessage = (() => {
    if (yearAgeError) return ERROR_MESSAGES.AGE_INVALID;
    if (yearFormatError || monthFieldError || dayFieldError)
      return ERROR_MESSAGES.BIRTH_INVALID;
    return '';
  })();

  const dateErrorStatus = {
    year: birthYear !== '' && (yearFormatError || yearAgeError),
    month: birthMonth !== '' && monthFieldError,
    day: birthDay !== '' && dayFieldError,
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.iconContainer}>
          <Icon name="StepDefault" size="12" />
          <Icon name="StepActive" size="12" />
        </div>
        <h1 className={styles.title}>완료까지 한 걸음 남았어요!</h1>
      </header>

      <div className={styles.container}>
        {/* 닉네임 입력 */}
        <div className={styles.fieldbox}>
          <h2 className={styles.fieldtitle}>닉네임</h2>
          <div className={styles.flexbox}>
            <TextField
              value={nickname}
              ref={nicknameRef}
              onChange={handleNicknameChange}
              isError={isNameFormatInvalid || isNameLengthInvalid}
              errorMessage={nameErrorMessage}
              maxLength={18}
              onRefresh={refresh}
              onEnter={handleNicknameEnter}
            />
          </div>
        </div>

        {/* 생년월일 입력 */}
        {isNameSectionValid && isNameSubmitted && (
          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>생년월일</h2>
            <div className={styles.flexbox}>
              <DateField
                ref={yearRef}
                value={{ year: birthYear, month: birthMonth, day: birthDay }}
                onChange={(value) => {
                  handleBirthYearChange(value.year);
                  handleBirthMonthChange(value.month);
                  handleBirthDayChange(value.day);
                }}
                error={dateErrorStatus}
                errorMessage={birthErrorMessage}
              />
            </div>
          </div>
        )}

        {/* 성별 선택 */}
        {isNameSectionValid && isNameSubmitted && isBirthSectionValid && (
          <div className={styles.fieldbox}>
            <h2 className={styles.fieldtitle}>성별</h2>
            <div className={styles.flexbox}>
              <Chip
                selected={gender === 'MALE'}
                color="weak"
                onClick={() => setGender('MALE')}
              >
                남성
              </Chip>
              <Chip
                selected={gender === 'FEMALE'}
                color="weak"
                onClick={() => setGender('FEMALE')}
              >
                여성
              </Chip>
              <Chip
                selected={gender === 'NONBINARY'}
                color="weak"
                onClick={() => setGender('NONBINARY')}
              >
                밝히고 싶지 않음
              </Chip>
            </div>
          </div>
        )}
      </div>

      <div className={styles.btnarea}>
        <ActionButton
          disabled={!isFormValid || !signupToken}
          type="submit"
          fullWidth
        >
          완료하기
        </ActionButton>
      </div>
    </form>
  );
};

export default SignupPage;
