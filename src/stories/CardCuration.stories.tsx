import CardCuration from '@/pages/mypage/components/card/cardCuration/CardCuration';

import CardImageUrl from '@assets/images/cardExImg.svg?url';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/CardCuration',
  component: CardCuration,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: { control: 'text' },
    onCurationClick: { action: 'click' },
  },
  parameters: {
    docs: {
      description: {
        component: '생성된 이미지 카드와 큐레이션 버튼을 묶은 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof CardCuration>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageId: 1,
    imageUrl: CardImageUrl,
  },
};
