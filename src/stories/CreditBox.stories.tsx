import { ToastContainer } from 'react-toastify';

import CreditBox from '@/shared/components/creditBox/CreditBox';
import { toastConfig } from '@/shared/types/toast';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/credit/CreditBox',
  component: CreditBox,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastContainer {...toastConfig} />
      </>
    ),
  ],
  argTypes: {
    credit: { control: 'number' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '보유 크레딧과 충전 버튼을 함께 제공하는 박스 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof CreditBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    credit: 8,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    credit: 8,
    disabled: true,
  },
};
