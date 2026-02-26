// jest-dom의 toBeInTheDocument(), toBeVisible() 등 DOM 전용 매처를 전역 등록
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/mocks/server';

// MSW: 테스트 시작 전 서버 시작 (등록 안 된 요청은 에러로 즉시 감지)
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 각 테스트 후 핸들러 초기화 (server.use()로 오버라이드한 것 리셋) + DOM 초기화(cleanup())
afterEach(() => {
  server.resetHandlers();
  cleanup();
});

// 모든 테스트 완료 후 서버 종료
afterAll(() => server.close());
