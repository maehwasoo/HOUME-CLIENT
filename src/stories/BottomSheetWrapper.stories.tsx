import { useState } from 'react';

import { BottomSheetWrapper } from '@/shared/components/bottomSheet/BottomSheetWrapper';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/bottomSheet/BottomSheetWrapper',
  component: BottomSheetWrapper,
  tags: ['autodocs'],
  args: {
    isOpen: true,
    onClose: () => {},
    children: <div style={{ padding: '1rem' }}>바텀시트 콘텐츠 영역</div>,
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '드래그로 닫을 수 있는 바텀시트 래퍼 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof BottomSheetWrapper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <button type="button" onClick={() => setIsOpen(true)}>
          바텀시트 열기
        </button>
        <BottomSheetWrapper
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onExited={() => setIsOpen(false)}
        >
          <div style={{ padding: '1rem' }}>바텀시트 콘텐츠 영역</div>
        </BottomSheetWrapper>
      </div>
    );
  },
};

export const Curation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
      <div style={{ height: '100vh', position: 'relative' }}>
        <button type="button" onClick={() => setIsOpen(true)}>
          바텀시트 열기
        </button>
        <BottomSheetWrapper
          isOpen={isOpen}
          typeVariant="curation"
          onClose={() => setIsOpen(false)}
          onExited={() => setIsOpen(false)}
        >
          <div style={{ padding: '1rem' }}>큐레이션 타입 콘텐츠</div>
        </BottomSheetWrapper>
      </div>
    );
  },
};
