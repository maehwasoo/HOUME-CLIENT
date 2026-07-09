// 색상 입력값을 hex 문자열 배열로 정규화하는 유틸
// - `{ name, value }` 객체 배열 / 문자열 배열 두 형태 모두 지원
// - 한글 색상 이름은 매핑 테이블을 거쳐 hex로 변환
// - hex 패턴이 아닌 값은 제거

const COLOR_NAME_TO_HEX_MAP: Record<string, string> = {
  화이트: '#FFFFFF',
  브라운: '#8B4513',
  블루: '#0000FF',
  블랙: '#000000',
  베이지: '#F5F5DC',
  그린: '#008000',
  핑크: '#FFC0CB',
  옐로우: '#FFFF00',
  레드: '#FF0000',
  골드: '#FFD700',
  그레이: '#808080',
  실버: '#C0C0C0',
  오렌지: '#FFA500',
  바이올렛: '#8F00FF',
  네이비: '#000080',
};

const HEX_PATTERN = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export const normalizeColorHexes = (value: unknown): string[] => {
  if (!Array.isArray(value)) return [];

  return value
    .map((color) => {
      // `{ name, value }` 객체 형태
      if (typeof color === 'object' && color !== null && 'value' in color) {
        const rawValue = (color as { value?: unknown }).value;
        if (typeof rawValue !== 'string') return null;
        const trimmed = rawValue.trim();
        if (HEX_PATTERN.test(trimmed)) return trimmed;
        return COLOR_NAME_TO_HEX_MAP[trimmed] ?? null;
      }
      // 문자열 형태 — hex 그대로 또는 한글 이름이면 매핑
      if (typeof color === 'string') {
        const trimmed = color.trim();
        if (HEX_PATTERN.test(trimmed)) return trimmed;
        return COLOR_NAME_TO_HEX_MAP[trimmed] ?? null;
      }
      return null;
    })
    .filter((color): color is string => Boolean(color));
};
