import { act, renderHook, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { useGenerateImageMutation } from './useGenerateImageMutation';
import { server } from '../../../../mocks/server';
import { queryClient } from '../../../../shared/apis/config/queryClient';
import { queryKeys } from '../../../../shared/constants/queryKey';
import { createWrapper } from '../../../../tests/utils';
import { useABTest } from '../../hooks/useABTest';
import { useGenerateStore } from '../../stores/useGenerateStore';

// vi.mock은 파일 최상단으로 hoist되므로 외부 변수 참조 불가
// → 팩토리 내부에서 vi.fn() 직접 생성 후 vi.mocked()로 접근
vi.mock('../../../../shared/apis/config/queryClient', () => ({
  queryClient: { invalidateQueries: vi.fn() },
}));

vi.mock('../../hooks/useABTest', () => ({
  useABTest: vi.fn(() => ({
    variant: 'single' as const,
    isLoading: false,
    error: null,
    isSingleImage: true,
    isMultipleImages: false,
  })),
}));

vi.mock('../../stores/useGenerateStore', () => ({
  useGenerateStore: vi.fn(() => ({
    resetGenerate: vi.fn(),
    setNavigationData: vi.fn(),
    setApiCompleted: vi.fn(),
  })),
}));

const mockRequest: Parameters<
  ReturnType<typeof useGenerateImageMutation>['mutate']
>[0] = {
  houseId: 1,
  equilibrium: 'BALANCE',
  floorPlan: { floorPlanId: 1, isMirror: false },
  moodBoardIds: [1, 2],
  activity: 'COOKING',
  selectiveIds: [1],
};

describe('useGenerateImageMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('v2(단일 이미지) 성공 시 스토어 액션과 3개 queryKey가 invalidate된다', async () => {
    const mockResetGenerate = vi.fn();
    const mockSetNavigationData = vi.fn();
    const mockSetApiCompleted = vi.fn();

    vi.mocked(useABTest).mockReturnValue({
      variant: 'single',
      isLoading: false,
      error: null,
      isSingleImage: true,
      isMultipleImages: false,
    });
    vi.mocked(useGenerateStore).mockReturnValue({
      resetGenerate: mockResetGenerate,
      setNavigationData: mockSetNavigationData,
      setApiCompleted: mockSetApiCompleted,
    });

    const { result } = renderHook(() => useGenerateImageMutation(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate(mockRequest);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockResetGenerate).toHaveBeenCalledTimes(1);
    expect(mockSetApiCompleted).toHaveBeenCalledWith(true);
    expect(mockSetNavigationData).toHaveBeenCalledWith({
      imageInfoResponses: [
        expect.objectContaining({
          imageId: 1,
          imageUrl: 'https://example.com/image.jpg',
        }),
      ],
    });

    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.generate.image(),
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.mypage.images(),
    });
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({
      queryKey: queryKeys.mypage.user(),
    });
  });

  it('v3(다중 이미지) 성공 시 imageInfoResponses 배열을 setNavigationData에 전달한다', async () => {
    const mockSetNavigationData = vi.fn();

    vi.mocked(useABTest).mockReturnValue({
      variant: 'multiple',
      isLoading: false,
      error: null,
      isSingleImage: false,
      isMultipleImages: true,
    });
    vi.mocked(useGenerateStore).mockReturnValue({
      resetGenerate: vi.fn(),
      setNavigationData: mockSetNavigationData,
      setApiCompleted: vi.fn(),
    });

    const { result } = renderHook(() => useGenerateImageMutation(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate(mockRequest);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockSetNavigationData).toHaveBeenCalledWith({
      imageInfoResponses: [
        expect.objectContaining({
          imageId: 1,
          imageUrl: 'https://example.com/image1.jpg',
        }),
      ],
    });
  });

  it('API 에러 시 isError가 true이고 invalidateQueries가 호출되지 않는다', async () => {
    vi.mocked(useABTest).mockReturnValue({
      variant: 'single',
      isLoading: false,
      error: null,
      isSingleImage: true,
      isMultipleImages: false,
    });
    vi.mocked(useGenerateStore).mockReturnValue({
      resetGenerate: vi.fn(),
      setNavigationData: vi.fn(),
      setApiCompleted: vi.fn(),
    });

    server.use(
      http.post('*/api/v2/generated-images/generate/gemini', () =>
        HttpResponse.json({ message: 'Server Error' }, { status: 500 })
      )
    );

    const { result } = renderHook(() => useGenerateImageMutation(), {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate(mockRequest);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(queryClient.invalidateQueries).not.toHaveBeenCalled();
  });
});
