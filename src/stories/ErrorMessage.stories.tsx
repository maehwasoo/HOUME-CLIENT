import ErrorMessage from '@components/button/ErrorButton/ErrorMessage';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof ErrorMessage> = {
  title: 'shared/button/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    message: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    message: '알 수 없는 오류가 발생했습니다.',
  },
};
