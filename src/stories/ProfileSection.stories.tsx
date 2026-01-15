import ProfileSection from '@/pages/mypage/components/section/profile/ProfileSection';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/ProfileSection',
  component: ProfileSection,
  tags: ['autodocs'],
  argTypes: {
    userName: { control: 'text' },
    credit: { control: 'number' },
    maxCredit: { control: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component: '마이페이지 상단 프로필 영역입니다.',
      },
    },
  },
} satisfies Meta<typeof ProfileSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: '호움',
    credit: 3,
    maxCredit: 10,
  },
};
