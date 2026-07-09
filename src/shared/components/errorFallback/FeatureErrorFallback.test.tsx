import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';

// 내부 컴포넌트의 SVG/스타일 의존성을 제거하고 버튼/텍스트 동작만 검증
vi.mock('@components/errorFallback/ErrorIllustration', () => ({
  default: () => <div data-testid="error-illustration" />,
}));
vi.mock('@components/button/ctaButton/CtaButton', () => ({
  default: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}));

import FeatureErrorFallback from './FeatureErrorFallback';

describe('FeatureErrorFallback', () => {
  const mockResetErrorBoundary = vi.fn();
  const defaultProps = {
    error: new Error('test error'),
    resetErrorBoundary: mockResetErrorBoundary,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 에러 UI 텍스트가 올바르게 렌더링되는지 확인
  it('에러 안내 텍스트를 렌더링한다', () => {
    render(<FeatureErrorFallback {...defaultProps} />);
    expect(screen.getByText('문제가 발생했어요')).toBeInTheDocument();
  });

  // 다시 시도 버튼이 DOM에 존재하는지 확인
  it('다시 시도 버튼을 렌더링한다', () => {
    render(<FeatureErrorFallback {...defaultProps} />);
    expect(
      screen.getByRole('button', { name: '다시 시도' })
    ).toBeInTheDocument();
  });

  // 버튼 클릭 시 ErrorBoundary 리셋 콜백이 호출되는지 확인
  it('다시 시도 버튼 클릭 시 resetErrorBoundary를 호출한다', async () => {
    render(<FeatureErrorFallback {...defaultProps} />);
    await userEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(mockResetErrorBoundary).toHaveBeenCalledTimes(1);
  });
});
