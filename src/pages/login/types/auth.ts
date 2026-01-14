// 카카오 로그인 관련 타입
export interface KakaoLoginPrefill {
  email: string;
  nickname: string;
}

export interface KakaoLoginResponse {
  isNewUser: boolean;
  signupToken: string | null;
  prefill: KakaoLoginPrefill | null;
}

// 로그아웃 관련 타입
export interface LogoutResponse {
  message: string;
}

// 로그인 API 응답 타입
export interface LoginApiResponse {
  data: KakaoLoginResponse;
  accessToken?: string;
}
