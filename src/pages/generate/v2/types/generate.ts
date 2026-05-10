// 스택 UI
export interface CarouselItem {
  carouselId: number;
  url: string;
}

export interface ImageStackResponse {
  carousels: CarouselItem[];
}

// 이미지 생성 API 요청 데이터 타입
export interface GenerateImageRequest extends Record<string, unknown> {
  houseId: number;
  equilibrium: string;
  floorPlan: {
    floorPlanId: number;
    isMirror: boolean;
  };
  moodBoardIds: number[];
  activity: string;
  selectiveIds: number[];
}
