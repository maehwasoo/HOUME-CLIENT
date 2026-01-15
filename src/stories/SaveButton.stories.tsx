import { useEffect, useState } from 'react';

import SaveButton from '@components/button/saveButton/SaveButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof SaveButton> = {
  title: 'shared/button/SaveButton',
  component: SaveButton,
  tags: ['autodocs'],
  argTypes: {
    isSelected: { control: 'boolean' },
    onClick: { action: 'toggle' },
  },
};

export default meta;

type Story = StoryObj<typeof SaveButton>;

const RenderButton = (args: Story['args']) => {
  const [isSelected, setIsSelected] = useState(args?.isSelected ?? false);

  useEffect(() => {
    setIsSelected(args?.isSelected ?? false);
  }, [args?.isSelected]);

  return (
    <SaveButton
      {...args}
      isSelected={isSelected}
      onClick={() => {
        args?.onClick?.();
        setIsSelected((prev) => !prev);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    isSelected: false,
  },
  render: (args) => <RenderButton {...args} />,
};

export const Selected: Story = {
  args: {
    isSelected: true,
  },
  render: (args) => <RenderButton {...args} />,
};
