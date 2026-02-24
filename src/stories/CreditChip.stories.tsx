import CreditChip from '@/shared/components/creditChip/CreditChip';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/credit/CreditChip',
  component: CreditChip,
  tags: ['autodocs'],
  argTypes: {
    creditCount: { control: 'number', description: '현재 크레딧' },
    maxCredit: { control: 'number', description: '최대 크레딧' },
  },
  parameters: {
    docs: {
      description: {
        component: '보유 크레딧/최대 크레딧을 표시하는 칩 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof CreditChip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    creditCount: 3,
    maxCredit: 10,
  },
};

export const Full: Story = {
  args: {
    creditCount: 10,
    maxCredit: 10,
  },
};

export const Zero: Story = {
  args: {
    creditCount: 0,
    maxCredit: 10,
  },
};
