import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import InlineError from './InlineError';

describe('InlineError', () => {
  // message prop 미전달 시 기본값 표시
  it('기본 메시지를 표시한다', () => {
    render(<InlineError />);
    expect(screen.getByText('데이터를 불러올 수 없습니다')).toBeInTheDocument();
  });

  // message prop 전달 시 해당 텍스트 표시
  it('message prop을 표시한다', () => {
    render(<InlineError message="주거 옵션을 불러올 수 없습니다" />);
    expect(
      screen.getByText('주거 옵션을 불러올 수 없습니다')
    ).toBeInTheDocument();
  });

  // onRetry 없으면 버튼 자체가 DOM에 없어야 함
  it('onRetry가 없으면 다시 시도 버튼이 없다', () => {
    render(<InlineError />);
    expect(
      screen.queryByRole('button', { name: '다시 시도' })
    ).not.toBeInTheDocument();
  });

  // onRetry 있으면 버튼 클릭 시 콜백 호출
  it('onRetry가 있으면 다시 시도 버튼 클릭 시 콜백이 호출된다', async () => {
    const onRetry = vi.fn();
    render(<InlineError onRetry={onRetry} />);
    await userEvent.click(screen.getByRole('button', { name: '다시 시도' }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
