import type { BaseResponse } from '@shared/types/apis';
import type { Gender } from '@shared/types/formOptions';

// 마이페이지 사용자 정보 조회 API
export interface MyPageUserData {
  userId: number;
  name: string;
  CreditCount: number; // 서버 응답과 동일하게 CreditCount 사용
}

export type MyPageUserResponse = BaseResponse<MyPageUserData>;

// 사용자 프로필 수정
export interface EditProfileRequest {
  nickname: string;
  gender: Gender;
  birthday: string;
}
