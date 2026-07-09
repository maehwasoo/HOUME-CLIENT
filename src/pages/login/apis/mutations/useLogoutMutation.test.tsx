import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useLogoutMutation } from './useLogoutMutation';
import { server } from '../../../../mocks/server';
import { queryClient } from '../../../../shared/apis/config/queryClient';
import { createWrapper } from '../../../../tests/utils';

const mockNavigate = vi.fn();
const mockClearUser = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock('../../../../shared/apis/config/queryClient', () => ({
  queryClient: { clear: vi.fn(), invalidateQueries: vi.fn() },
}));

vi.mock('@store/useUserStore', () => ({
  useUserStore: {
    getState: vi.fn(() => ({ clearUser: mockClearUser })),
  },
}));

const createAuthWrapper = () => {
  const BaseWrapper = createWrapper();
  return ({ children }: { children: React.ReactNode }) => (
    <BaseWrapper>
      <MemoryRouter>{children}</MemoryRouter>
    </BaseWrapper>
  );
};

describe('useLogoutMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로그아웃 성공 시 clearUser, queryClient.clear, HOME으로 이동한다', async () => {
    server.use(
      http.post('*/logout', () =>
        HttpResponse.json({ message: 'OK' }, { status: 200 })
      )
    );

    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: createAuthWrapper(),
    });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockClearUser).toHaveBeenCalledTimes(1);
    expect(queryClient.clear).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });

  it('로그아웃 API 실패(onSettled)여도 clearUser, queryClient.clear, HOME으로 이동한다', async () => {
    server.use(
      http.post('*/logout', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useLogoutMutation(), {
      wrapper: createAuthWrapper(),
    });

    act(() => {
      result.current.mutate();
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(mockClearUser).toHaveBeenCalledTimes(1);
    expect(queryClient.clear).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});
