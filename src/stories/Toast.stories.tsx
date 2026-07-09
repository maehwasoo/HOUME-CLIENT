import SonnerToastTest from '@components/v2/toast/ToastTest';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/v2/toast/Toast',
  component: SonnerToastTest,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Sonner 기반 토스트 수동 확인용 스토리입니다. 버튼을 눌러 위치와 액션 케이스를 직접 확인할 수 있습니다.',
      },
    },
  },
} satisfies Meta<typeof SonnerToastTest>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
