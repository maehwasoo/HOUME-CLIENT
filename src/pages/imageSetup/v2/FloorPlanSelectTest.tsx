/**
 * FloorPlanSelectStep 독립 테스트 페이지
 * 퍼널 없이 도면 선택 UI + 로직을 검증하기 위한 임시 페이지
 *
 * 사용법: /test/floor-plan 접속
 *
 * 검증 항목:
 *   - 그리드 렌더 + 카드 클릭 → FloorPlanSheet 오픈
 *   - 필터 칩 → FilterSheet → 적용/초기화
 *   - 다중뷰 prev/next 전환 + 뷰 이름/평형 표시
 *   - 좌우반전 토글
 *   - 최근 생성 시트 (DUMMY_RECENT_FLOOR_PLAN에 값 넣어서 확인)
 *   - "공간 선택하기" → console.log 출력
 *
 * TODO: 검증 완료 후 이 파일 + router.tsx 테스트 경로 삭제
 */

import FloorPlanSelectStep from './steps/floorPlanSelect/FloorPlanSelectStep';

import type { CompletedFloorPlan } from '../types/funnel/steps';

const MOCK_CONTEXT = {
  houseType: 'OFFICETEL',
  roomType: 'ONE_ROOM',
  areaType: 'TENS',
  houseId: 1,
};

const handleNext = (data: CompletedFloorPlan) => {
  console.log('[FloorPlanSelectTest] onNext 호출됨:', data);
};

const FloorPlanSelectTest = () => {
  return <FloorPlanSelectStep context={MOCK_CONTEXT} onNext={handleNext} />;
};

export default FloorPlanSelectTest;
