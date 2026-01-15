import CardHistory from '@/shared/components/card/cardHistory/CardHistory';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CardHistory> = {
  title: 'shared/card/CardHistory',
  component: CardHistory,
  args: {
    src: '/images/example.png',
    title: '우드 인테리어의 8평 오피스텔',
    btnText: '가구 추천 보러가기',
  },
  argTypes: {
    src: {
      control: 'text',
    },
    title: {
      control: 'text',
    },
    btnText: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
