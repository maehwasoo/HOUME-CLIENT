import { globalStyle } from '@vanilla-extract/css';

/**
 * CSS Reset - vanilla-extract 버전
 * 브라우저 기본 스타일을 초기화하여 일관된 스타일링 기반을 제공합니다.
 *
 * Modern CSS Reset을 프로젝트 요구사항에 맞게 확장했습니다.
 * 참고: https://piccalil.li/blog/a-modern-css-reset/
 *
 * 주요 변경점:
 * - 추가적인 리셋 (모든 요소의 padding 제거)
 * - rem 계산 편의를 위한 62.5% 폰트 크기
 * - 모바일 최적화 속성 추가 (tap highlight, touch-action 등)
 * - 폼 요소에 대한 더 완전한 리셋 (all: unset 사용)
 */

/* ===== Box Model Reset ===== */
/**
 * 1. 모든 요소에 border-box 적용 (패딩과 보더가 너비에 포함)
 * 2. 기본 마진과 패딩 제거
 */
globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

/* ===== 루트 요소 설정 ===== */
/**
 * rem 단위 계산을 쉽게 하기 위해 10px 기준으로 설정
 * 1rem = 10px (62.5% of 16px)
 */
globalStyle('html', {
  textSizeAdjust: '100%',
  // 텍스트 크기 조정 방지 (모바일) - 표준 CSS 사용
  fontSize: '62.5%',
});

/* ===== Body 기본값 ===== */
/**
 * line-height 기본값 설정으로 가독성 향상
 */
globalStyle('body', {
  textRendering: 'optimizeSpeed',
  // 텍스트 렌더링 최적화
  lineHeight: 1.5,
});

/* ===== 제목 요소 초기화 ===== */
/**
 * 제목 태그들의 기본 스타일 제거
 * 프로젝트에서 정의한 스타일만 적용되도록 함
 */
globalStyle('h1, h2, h3, h4, h5, h6', {
  margin: 0,
  lineHeight: 'inherit',
  fontSize: 'inherit',
  fontWeight: 'inherit',
});

/* ===== 텍스트 요소 초기화 ===== */
/**
 * 문단 태그의 기본 마진 제거
 */
globalStyle('p', {
  margin: 0,
});

/* ===== 리스트 초기화 ===== */
/**
 * 리스트의 기본 스타일 제거
 * 마커/번호 제거 및 들여쓰기 제거
 */
globalStyle('ul, ol', {
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

/* ===== 링크 초기화 ===== */
/**
 * 링크의 기본 색상과 밑줄 제거
 * 부모 요소의 색상 상속
 */
globalStyle('a', {
  textDecoration: 'none',
  color: 'inherit',
});

/* ===== 미디어 요소 ===== */
/**
 * 이미지와 비디오가 컨테이너를 넘지 않도록 제한
 * 이미지 하단 여백 제거 (inline-block 특성)
 * 모바일에서 이미지 드래그 및 선택 방지
 */
globalStyle('img, picture, video, canvas, svg', {
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
});

/**
 * 이미지 사용자 상호작용 제어
 * 모던 방식으로 이미지 선택 및 드래그 비활성화
 */
globalStyle('img', {
  pointerEvents: 'auto', // 텍스트 선택 방지
  // 접근성을 위한 설정
  userSelect: 'none', // 클릭/탭 이벤트는 허용
  // 드래그 비활성화는 CSS 대신 JavaScript로 처리 권장
  // draggable="false" 속성을 HTML에서 사용하세요
});

/* ===== 폼 요소 초기화 ===== */
/**
 * 버튼의 모든 기본 스타일 제거
 * 커서는 포인터로 유지하여 클릭 가능함을 표시
 */
globalStyle('button', {
  all: 'unset',
  boxSizing: 'border-box',
  outline: 'none',
  // 텍스트 선택 방지
  cursor: 'pointer',
  // 모바일 터치 하이라이트는 outline: none으로 대체 가능
  userSelect: 'none',
});

/**
 * 입력 요소들의 기본 스타일 제거
 * 폰트는 부모 요소에서 상속
 */
globalStyle('input, textarea, select', {
  all: 'unset',
  touchAction: 'manipulation',
  color: 'inherit',
  fontFamily: 'inherit',
  // 모바일에서 확대 방지
  fontSize: 'inherit',
});

/**
 * textarea 리사이즈 세로만 허용
 */
globalStyle('textarea', {
  resize: 'vertical',
});

/* ===== 테이블 초기화 ===== */
/**
 * 테이블 셀 간격 제거
 */
globalStyle('table', {
  borderCollapse: 'collapse',
  borderSpacing: 0,
});

/* ===== 기타 요소 ===== */
/**
 * hr 요소 스타일 초기화
 */
globalStyle('hr', {
  margin: 0,
  border: 0,
  borderTop: '1px solid',
});

/**
 * 숨김 속성이 있는 요소는 확실히 숨김
 */
globalStyle('[hidden]', {
  display: 'none !important',
});

/**
 * 포커스 아웃라인 접근성을 위해 유지
 * (필요시 프로젝트에서 커스터마이징)
 */
globalStyle(':focus-visible', {
  outline: '2px solid',
  outlineOffset: '2px',
});
