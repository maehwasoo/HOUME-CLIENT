import ErrorIllustration from '@components/errorFallback/ErrorIllustration';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/errorFallback/ErrorIllustration',
  component: ErrorIllustration,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '에러 페이지에서 사용하는 일러스트레이션 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof ErrorIllustration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
