import { useEffect, useState } from 'react';
import type { ComponentProps } from 'react';

import CardProduct from '@/shared/components/card/cardProduct/CardProduct';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof CardProduct> = {
  title: 'shared/card/CardProduct',
  component: CardProduct,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['small', 'large'],
    },
    title: { control: 'text' },
    brand: { control: 'text' },
    linkHref: { control: 'text' },
    linkLabel: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '상품 카드 컴포넌트입니다. 저장 버튼과 링크 버튼을 포함합니다.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CardProduct>;

type CardProductArgs = ComponentProps<typeof CardProduct>;

const CardProductStory = (args: CardProductArgs) => {
  const [isSaved, setIsSaved] = useState(args.isSaved ?? false);

  useEffect(() => {
    setIsSaved(args.isSaved ?? false);
  }, [args.isSaved]);

  return (
    <CardProduct
      {...args}
      isSaved={isSaved}
      onToggleSave={() => setIsSaved((prev) => !prev)}
      onLinkClick={() => {}}
      onCardClick={() => {}}
    />
  );
};

export const Small: Story = {
  args: {
    size: 'small',
    title: '아치형 전신 거울',
    isSaved: false,
    linkHref: 'https://example.com',
    linkLabel: '사이트',
  },
  render: (args) => <CardProductStory {...args} />,
};

export const Large: Story = {
  args: {
    size: 'large',
    title: '우드 체어',
    brand: 'HOUME',
    isSaved: true,
    linkHref: 'https://example.com',
    linkLabel: '공식 사이트',
  },
  render: (args) => <CardProductStory {...args} />,
};
