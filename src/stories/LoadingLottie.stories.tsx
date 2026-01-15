import LoadingLottie from '@/shared/components/lottie/LoadingLottie';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/loading/LoadingLottie',
  component: LoadingLottie,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로딩 애니메이션을 보여주는 Lottie 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof LoadingLottie>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
