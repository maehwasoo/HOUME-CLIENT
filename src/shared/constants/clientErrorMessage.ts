// 클라이언트 측에서 관리되는 에러 메시지 (api 에러 메시지 X)
export const ERROR_MESSAGES = {
  APARTMENT_IMPOSSIBLE: `현재 아파트, 그 외 유형은 지원하지 않아요. \n 점차 확대될 예정이에요.`,
  NO_FLOORPLAN: '우리 집 구조와 유사한 템플릿이 없어요',
  NAME_INVALID: '특수문자 및 공백은 입력할 수 없어요.',
  LENGTH_INVALID: '최소 2자 이상 입력해주세요.',
  AGE_INVALID: '만 14세 이상만 가입할 수 있어요.',
  BIRTH_INVALID: '올바른 생년월일을 입력해주세요.',
};
