import { useEffect, useState } from 'react';

import FilterChip from '@/pages/generate/components/filterChip/FilterChip';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/generate/FilterChip',
  component: FilterChip,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    isSelected: { control: 'boolean' },
    onClick: { action: 'click' },
  },
  parameters: {
    docs: {
      description: {
        component: '선택 상태를 표시하는 필터 칩 버튼입니다.',
      },
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;

type Story = StoryObj<typeof meta>;

const FilterChipStory = (args: Story['args']) => {
  const [isSelected, setIsSelected] = useState(args?.isSelected ?? false);

  useEffect(() => {
    setIsSelected(args?.isSelected ?? false);
  }, [args?.isSelected]);

  return (
    <FilterChip
      {...args}
      isSelected={isSelected}
      onClick={(event) => {
        args.onClick?.(event);
        setIsSelected((prev) => !prev);
      }}
    >
      {args?.children}
    </FilterChip>
  );
};

export const Default: Story = {
  args: {
    children: '모던',
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    children: '모던',
    isSelected: true,
  },
};

export const Interactive: Story = {
  args: {
    children: '클릭으로 토글',
    isSelected: false,
  },
  render: (args) => <FilterChipStory {...args} />,
};
