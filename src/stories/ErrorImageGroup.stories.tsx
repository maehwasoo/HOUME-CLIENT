import ErrorImageGroup from '@/pages/Error404Page/components/ErrorImageGroup';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/error404/ErrorImageGroup',
  component: ErrorImageGroup,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '404 페이지에서 사용하는 이미지 레이어 그룹입니다.',
      },
    },
  },
} satisfies Meta<typeof ErrorImageGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
