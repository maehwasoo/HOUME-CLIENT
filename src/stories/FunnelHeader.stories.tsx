import FunnelHeader from '@/pages/imageSetup/components/header/FunnelHeader';
import { PROGRESS_STEPS } from '@/shared/components/progressBarKey/ProgressBarKey.types';

import HeaderImage from '@assets/images/cardExImg.svg?url';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/imageSetup/FunnelHeader',
  component: FunnelHeader,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    detail: { control: 'text' },
    currentStep: {
      control: { type: 'radio' },
      options: [
        PROGRESS_STEPS.BASIC_INFO,
        PROGRESS_STEPS.FLOOR_PLAN,
        PROGRESS_STEPS.MOOD_BOARD,
        PROGRESS_STEPS.MAIN_ACTIVITY,
      ],
    },
    image: { control: 'text' },
    size: {
      control: { type: 'radio' },
      options: ['short', 'long'],
    },
  },
  parameters: {
    docs: {
      description: {
        component: '이미지 설정 단계의 상단 헤더 영역입니다.',
      },
    },
  },
} satisfies Meta<typeof FunnelHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Long: Story = {
  args: {
    title: '주거 정보를 알려주세요',
    detail: '입력한 정보로 스타일링 이미지를 만들어요',
    currentStep: PROGRESS_STEPS.BASIC_INFO,
    image: HeaderImage,
    size: 'long',
  },
};

export const Short: Story = {
  args: {
    title: '평면도를 골라주세요',
    detail: '이미지와 가장 비슷한 구조를 선택해요',
    currentStep: PROGRESS_STEPS.FLOOR_PLAN,
    image: HeaderImage,
    size: 'short',
  },
};
