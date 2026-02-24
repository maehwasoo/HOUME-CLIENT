import CurationButton from '@/pages/mypage/components/button/curationButton/CurationButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/CurationButton',
  component: CurationButton,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'click' },
  },
} satisfies Meta<typeof CurationButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
