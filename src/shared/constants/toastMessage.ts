export const TOAST_MESSAGE = {
  LOGIN_SUCCESS: '로그인에 성공했어요',
  LOGIN_ERROR: '로그인에 실패했어요. 다시 시도해주세요.',
  REQUIRED_ITEM_LOCKED: '필수 가구는 선택 해제할 수 없어요',
  SAVED_ITEM_MOVE: '상품을 찜했어요! 찜한 상품으로 이동할까요?',
  SAVED_ITEM_REMOVED: '찜을 취소했어요',
} as const;

export const TOAST_ACTION_LABEL = {
  MOVE: '이동',
  UNDO: '되돌리기',
} as const;
