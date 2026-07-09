import Loading from '@components/loading/Loading';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/loading/Loading',
  component: Loading,
  tags: ['autodocs'],
  argTypes: {
    show: { control: 'boolean' },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '전체 화면에 로딩 상태를 표시하는 오버레이 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof Loading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    show: true,
  },
};

export const Hidden: Story = {
  args: {
    show: false,
  },
};
