import IntroSection from '@/pages/home/components/introSection/IntroSection';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof IntroSection> = {
  title: 'pages/home/IntroSection',
  component: IntroSection,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: '홈(landing) 페이지의 인트로 섹션입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IntroSection>;

export const Default: Story = {};
