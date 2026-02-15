import AppErrorFallback from '@components/errorFallback/AppErrorFallback';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/errorFallback/AppErrorFallback',
  component: AppErrorFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '앱 전체 crash 시 표시되는 에러 화면입니다. App-level ErrorBoundary의 FallbackComponent로 사용됩니다.',
      },
    },
  },
} satisfies Meta<typeof AppErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
