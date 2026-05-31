export const TOAST_MESSAGE = {
  LOGIN_SUCCESS: '로그인에 성공했어요',
  LOGIN_ERROR: '로그인에 실패했어요. 다시 시도해주세요.',
  SIGNUP_SUCCESS: '회원가입에 성공했어요',
  SIGNUP_ERROR: '회원가입에 실패했어요. 다시 시도해주세요.',
  REQUIRED_ITEM_LOCKED: '필수 가구는 선택 해제할 수 없어요',
  RECENT_FLOOR_PLAN_LOADED: '저장된 내 공간을 불러왔어요',
  SAVED_ITEM_STORED: '찜한 상품에 저장했어요!',
  SAVED_ITEM_REMOVED: '찜을 취소했어요',
  PROFILE_EDIT_SUCCESS: '변경 사항을 저장했어요',
  ACTION_SERVER_ERROR: '일시적인 오류로 저장에 실패했어요. 다시 시도해 주세요.',
} as const;

export const TOAST_ACTION_LABEL = {
  VIEW: '보러가기',
  UNDO: '되돌리기',
} as const;
