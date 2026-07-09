export interface GenerateTypes {
  sqft: string;
  style: string[];
  user: string;
}

// 결과 페이지 좋아요/별로예요 상태
export type ResultPageLikeState = 'like' | 'dislike' | null;

// 스택 UI
export interface CarouselItem {
  carouselId: number;
  url: string;
}

export interface ImageStackResponse {
  carouselResponseDTOS: CarouselItem[];
}

// 이미지 생성 V4 요청 타입은 swagger 자동 생성 사용, V2/V3 Legacy API 관련 타입은 제거

// 이미지 생성/조회 응답의 optional 이미지 메타데이터(imageId/imageUrl/isMirror)를 narrow하여 공용으로 사용하는 타입
// - swagger 자동 생성 응답(GeneratedImageMetaResponse, GenerateImageV4Response 등)은 imageId/imageUrl/isMirror 모두 optional
// - 이미지 생성 API 응답에서 optional 제거 -> 사용처에서 optional 검증 코드 불필요
export interface GeneratedImagePayload {
  imageId: number;
  imageUrl: string;
  isMirror: boolean;
}

// 요인 문구 타입
export interface Factor {
  id: number;
  text: string;
}

// 요인 문구 API 응답 타입
export interface FactorsResponse {
  factors: Factor[];
}
