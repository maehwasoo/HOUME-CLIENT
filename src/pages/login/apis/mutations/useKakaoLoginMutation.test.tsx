import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import {
  getKakaoOAuthCallback,
  useKakaoLoginMutation,
} from './useKakaoLoginMutation';
import { server } from '../../../../mocks/server';
import { createWrapper } from '../../../../tests/utils';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal<typeof import('react-router-dom')>();
  return { ...actual, useNavigate: () => mockNavigate };
});

const mockSetAccessToken = vi.fn();

vi.mock('@store/useUserStore', () => ({
  useUserStore: vi.fn(
    (
      selector: (state: {
        setAccessToken: typeof mockSetAccessToken;
      }) => unknown
    ) => selector({ setAccessToken: mockSetAccessToken })
  ),
}));

// createWrapper에 MemoryRouter 포함
const createAuthWrapper = () => {
  const BaseWrapper = createWrapper();
  return ({ children }: { children: React.ReactNode }) => (
    <BaseWrapper>
      <MemoryRouter>{children}</MemoryRouter>
    </BaseWrapper>
  );
};

// 기존 회원 응답: access-token 헤더 포함
const existingUserHandler = http.get('*/oauth/kakao/callback', () =>
  HttpResponse.json(
    {
      code: 200,
      message: 'OK',
      data: { isNewUser: false, signupToken: null, prefill: null },
    },
    { headers: { 'access-token': 'mock-access-token' } }
  )
);

// 신규 회원 응답: signupToken 포함
const newUserHandler = http.get('*/oauth/kakao/callback', () =>
  HttpResponse.json(
    {
      code: 200,
      message: 'OK',
      data: {
        isNewUser: true,
        signupToken: 'mock-signup-token',
        prefill: { email: 'test@test.com', nickname: '테스트' },
      },
    },
    { status: 200 }
  )
);

describe('getKakaoOAuthCallback', () => {
  it('기존 회원 성공 시 accessToken을 반환한다', async () => {
    server.use(existingUserHandler);

    const result = await getKakaoOAuthCallback('test-code', 'dev');

    expect(result.accessToken).toBe('mock-access-token');
    expect(result.data.isNewUser).toBe(false);
  });

  it('신규 회원 성공 시 signupToken을 반환한다', async () => {
    server.use(newUserHandler);

    const result = await getKakaoOAuthCallback('test-code', 'dev');

    expect(result.data.isNewUser).toBe(true);
    expect(result.data.signupToken).toBe('mock-signup-token');
  });

  it('기존 회원인데 access-token 헤더가 없으면 에러를 던진다', async () => {
    server.use(
      http.get('*/oauth/kakao/callback', () =>
        HttpResponse.json({
          code: 200,
          message: 'OK',
          data: { isNewUser: false, signupToken: null, prefill: null },
        })
      )
    );

    await expect(getKakaoOAuthCallback('test-code', 'dev')).rejects.toThrow();
  });

  it('신규 회원인데 signupToken이 없으면 에러를 던진다', async () => {
    server.use(
      http.get('*/oauth/kakao/callback', () =>
        HttpResponse.json({
          code: 200,
          message: 'OK',
          data: { isNewUser: true, signupToken: null, prefill: null },
        })
      )
    );

    await expect(getKakaoOAuthCallback('test-code', 'dev')).rejects.toThrow();
  });
});

describe('useKakaoLoginMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('기존 회원 성공 시 setAccessToken 호출 후 HOME으로 이동한다', async () => {
    server.use(existingUserHandler);

    const { result } = renderHook(() => useKakaoLoginMutation(), {
      wrapper: createAuthWrapper(),
    });

    act(() => {
      result.current.mutate({ code: 'test-code', env: 'dev' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSetAccessToken).toHaveBeenCalledWith('mock-access-token');
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('신규 회원 성공 시 sessionStorage에 signupToken 저장 후 SIGNUP으로 이동한다', async () => {
    server.use(newUserHandler);

    const { result } = renderHook(() => useKakaoLoginMutation(), {
      wrapper: createAuthWrapper(),
    });

    act(() => {
      result.current.mutate({ code: 'test-code', env: 'dev' });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(sessionStorage.getItem('signupToken')).toBe('mock-signup-token');
    expect(mockNavigate).toHaveBeenCalledWith(
      '/signup',
      expect.objectContaining({
        state: expect.objectContaining({ signupToken: 'mock-signup-token' }),
      })
    );
  });

  it('API 에러 시 isError가 true이다', async () => {
    server.use(
      http.get('*/oauth/kakao/callback', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useKakaoLoginMutation(), {
      wrapper: createAuthWrapper(),
    });

    act(() => {
      result.current.mutate({ code: 'test-code', env: 'dev' });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(mockSetAccessToken).not.toHaveBeenCalled();
  });
});
