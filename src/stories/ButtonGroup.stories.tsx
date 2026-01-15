import { useEffect, useState } from 'react';

import ButtonGroup, {
  type ButtonGroupProps,
  type ButtonOption,
  type ButtonStatus,
} from '@/pages/imageSetup/components/buttonGroup/ButtonGroup';

import type { Meta, StoryObj } from '@storybook/react-vite';

const options: ButtonOption[] = [
  { id: 1, code: 'A01', label: '모던' },
  { id: 2, code: 'A02', label: '내추럴' },
  { id: 3, code: 'A03', label: '북유럽' },
  { id: 4, code: 'A04', label: '빈티지' },
];

const buttonStatuses: ButtonStatus[] = [
  { id: 1, isActive: true },
  { id: 2, isActive: true },
  { id: 3, isActive: false },
  { id: 4, isActive: true },
];

const meta = {
  title: 'pages/imageSetup/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  args: {
    onSelectionChange: () => {},
  },
  argTypes: {
    title: { control: 'text' },
    titleSize: {
      control: { type: 'radio' },
      options: ['small', 'large'],
    },
    selectionMode: {
      control: { type: 'radio' },
      options: ['single', 'multiple'],
    },
    buttonSize: {
      control: { type: 'radio' },
      options: ['xsmall', 'small', 'medium', 'large'],
    },
    layout: {
      control: { type: 'radio' },
      options: ['grid-2', 'grid-3', 'grid-4'],
    },
    hasBorder: { control: 'boolean' },
    maxSelection: { control: 'number' },
    errors: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: '다중/단일 선택을 지원하는 버튼 그룹 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

type ButtonGroupArgs = ButtonGroupProps<unknown>;

const ButtonGroupStory = (args: ButtonGroupArgs) => {
  const [selectedValues, setSelectedValues] = useState(args.selectedValues);

  useEffect(() => {
    setSelectedValues(args.selectedValues);
  }, [args.selectedValues]);

  return (
    <ButtonGroup
      {...args}
      selectedValues={selectedValues}
      onSelectionChange={setSelectedValues}
    />
  );
};

export const Single: Story = {
  args: {
    title: '스타일',
    titleSize: 'large',
    options: options,
    selectedValues: ['A01'],
    selectionMode: 'single',
    buttonSize: 'medium',
    layout: 'grid-2',
    hasBorder: false,
  },
  render: (args) => <ButtonGroupStory {...args} />,
};

export const Multiple: Story = {
  args: {
    title: '취향(최대 2개)',
    titleSize: 'small',
    options: options,
    selectedValues: ['A01', 'A02'],
    selectionMode: 'multiple',
    maxSelection: 2,
    buttonSize: 'small',
    layout: 'grid-2',
    hasBorder: true,
    buttonStatuses: buttonStatuses,
  },
  render: (args) => <ButtonGroupStory {...args} />,
};

export const WithError: Story = {
  args: {
    title: '스타일',
    titleSize: 'small',
    options: options,
    selectedValues: [],
    selectionMode: 'single',
    buttonSize: 'small',
    layout: 'grid-2',
    errors: '하나 이상 선택해 주세요',
  },
  render: (args) => <ButtonGroupStory {...args} />,
};
