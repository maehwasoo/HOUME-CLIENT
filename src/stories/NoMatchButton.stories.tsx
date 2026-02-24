import NoMatchButton from '@components/button/noMatchButton/NoMatchButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof NoMatchButton> = {
  title: 'shared/button/NoMatchButton',
  component: NoMatchButton,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
    onClick: { action: 'click' },
  },
};

export default meta;

type Story = StoryObj<typeof NoMatchButton>;

export const Default: Story = {
  args: {
    message: '조건에 맞는 가구를 찾지 못했어요',
  },
};
