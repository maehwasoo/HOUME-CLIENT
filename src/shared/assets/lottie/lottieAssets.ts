import loadingJson from './Loading.json';
import loadingLottie from './Loading.lottie';
import loginJson from './LogIn.json';
import loginLottie from './LogIn.lottie';
import signupJson from './SignUp.json';
import signupLottie from './SignUp.lottie';

/** Lottie 에셋 (primary: .lottie, fallback: .json) */
export const LOTTIE_ASSETS = {
  login: {
    lottie: loginLottie,
    json: loginJson,
  },
  signup: {
    lottie: signupLottie,
    json: signupJson,
  },
  loading: {
    lottie: loadingLottie,
    json: loadingJson,
  },
} as const;

export const LOTTIE_SPEED = {
  LOGIN: 0.5,
  SIGNUP: 1.5,
  LOADING: 1.5,
} as const;
