import SkeletonCardImage from '@/shared/components/card/cardImage/SkeletonCardImage';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SkeletonCardImage> = {
  title: 'shared/card/SkeletonCardImage',
  component: SkeletonCardImage,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'CardImage 로딩 상태에서 사용하는 스켈레톤 카드입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonCardImage>;

export const Default: Story = {};
