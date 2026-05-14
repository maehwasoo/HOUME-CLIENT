import type { GeneratedImagePayload } from '@pages/generate/types/generate';

// 이미지 생성 mutation 3종(full funnel / banner / other style)이 공유하는 이미지 생성 API 응답 검증 및 타입 narrowing용 헬퍼
// - swagger 응답의 optional 필드(imageId/imageUrl/isMirror)가 모두 들어왔는지 확인하고 GeneratedImagePayload 타입으로 좁혀 반환
// - 누락된 필드가 있으면 사용자에게 노출 가능한 메시지로 throw하여 mutation onError에서 처리 (발생 가능성 낮음)
export const toGeneratedImagePayload = (response: {
  imageId?: number;
  imageUrl?: string;
  isMirror?: boolean;
}): GeneratedImagePayload => {
  if (typeof response.imageId !== 'number') {
    throw new Error('이미지 생성 응답에 imageId가 누락되었습니다');
  }
  if (typeof response.imageUrl !== 'string') {
    throw new Error('이미지 생성 응답에 imageUrl이 누락되었습니다');
  }
  if (typeof response.isMirror !== 'boolean') {
    throw new Error('이미지 생성 응답에 isMirror가 누락되었습니다');
  }

  return {
    imageId: response.imageId,
    imageUrl: response.imageUrl,
    isMirror: response.isMirror,
  };
};
