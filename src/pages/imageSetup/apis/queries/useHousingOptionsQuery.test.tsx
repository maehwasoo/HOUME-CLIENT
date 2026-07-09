import { renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { describe, expect, it } from 'vitest';

import { useHousingOptionsQuery } from './useHousingOptionsQuery';
import { server } from '../../../../mocks/server';
import { createWrapper } from '../../../../tests/utils';

describe('useHousingOptionsQuery', () => {
  // MSW handlers.ts의 기본 응답(아파트/원룸/10평대)으로 검증
  it('성공 시 housing options 데이터를 반환한다', async () => {
    const { result } = renderHook(() => useHousingOptionsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.houseTypes[0].label).toBe('아파트');
  });

  // server.use()로 이 테스트에서만 500 에러로 오버라이드
  it('서버 에러 시 isError가 true이다', async () => {
    server.use(
      http.get('*/api/v1/housing-options', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useHousingOptionsQuery(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
