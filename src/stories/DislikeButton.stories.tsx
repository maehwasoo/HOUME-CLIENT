import DislikeButton from '@components/button/likeButton/DislikeButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof DislikeButton> = {
  title: 'shared/button/DislikeButton',
  component: DislikeButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          '싫어요 버튼 컴포넌트. 텍스트+아이콘(withText) / 아이콘-only(onlyIcon) 타입을 지원합니다.',
      },
    },
  },
  argTypes: {
    typeVariant: {
      control: 'radio',
      options: ['withText', 'onlyIcon'],
    },
    isSelected: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DislikeButton>;

const GrayBg = (Story: any) => (
  <div style={{ background: '#F3F4F7', padding: 16 }}>
    <Story />
  </div>
);

export const WithText: Story = {
  args: {
    typeVariant: 'withText',
    isSelected: false,
    children: '싫어요',
  },
};

export const WithTextSelected: Story = {
  args: {
    typeVariant: 'withText',
    isSelected: true,
    children: '싫어요',
  },
};

export const OnlyIcon: Story = {
  args: {
    typeVariant: 'onlyIcon',
    isSelected: false,
    'aria-label': '싫어요',
  },
  decorators: [GrayBg],
};

export const OnlyIconSelected: Story = {
  args: {
    typeVariant: 'onlyIcon',
    isSelected: true,
    'aria-label': '싫어요',
  },
  decorators: [GrayBg],
};

export const Disabled: Story = {
  args: {
    typeVariant: 'withText',
    isSelected: false,
    disabled: true,
    children: '싫어요',
  },
};
