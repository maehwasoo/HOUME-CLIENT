// 회원가입 api 관련 타입

export interface SignupRequest {
  signupToken: string;
  name: string;
  gender: 'MALE' | 'FEMALE' | 'NONBINARY';
  birthday: string; // e.g. "2001-01-10"
}

export interface SignupResponse {
  userName: string;
  accessToken: string;
}
