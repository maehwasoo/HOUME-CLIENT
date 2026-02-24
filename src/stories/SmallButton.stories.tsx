import SmallButton from '@/pages/mypage/components/button/smallButton/SmallButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/SmallButton',
  component: SmallButton,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    onClick: { action: 'click' },
  },
} satisfies Meta<typeof SmallButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '이미지 더보기',
  },
};

export const CustomText: Story = {
  args: {
    children: '이미지 만들러 가기',
  },
};
