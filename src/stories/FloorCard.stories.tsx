import FloorCard from '@/shared/components/card/floorCard/FloorCard';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof FloorCard> = {
  title: 'shared/card/FloorCard',
  component: FloorCard,
  args: {
    src: '/images/example.png',
  },
  argTypes: {
    src: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
