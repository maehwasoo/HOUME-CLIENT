import CardImage from '@/shared/components/card/cardImage/CardImage';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CardImage> = {
  title: 'shared/card/CardImage',
  component: CardImage,
  args: {
    selectOrder: 1,
    disabled: false,
    src: '/images/example.png',
  },
  argTypes: {
    selectOrder: {
      control: 'number',
    },
    disabled: {
      control: 'boolean',
    },
    src: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
