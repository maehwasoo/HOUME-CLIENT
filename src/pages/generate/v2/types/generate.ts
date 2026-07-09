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
