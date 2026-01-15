import LinkButton from '@components/button/linkButton/LinkButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof LinkButton> = {
  title: 'shared/button/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    children: { control: 'text' },
    href: { control: 'text' },
    typeVariant: {
      control: { type: 'radio' },
      options: ['withText', 'onlyIcon'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const WithText: Story = {
  args: {
    href: 'https://example.com',
    typeVariant: 'withText',
    children: '공식 사이트',
  },
};

export const OnlyIcon: Story = {
  args: {
    href: 'https://example.com',
    typeVariant: 'onlyIcon',
  },
};
