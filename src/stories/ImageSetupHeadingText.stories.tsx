import HeadingText from '@/pages/imageSetup/components/headingText/HeadingText';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/imageSetup/HeadingText',
  component: HeadingText,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
  },
  parameters: {
    docs: {
      description: {
        component: '이미지 설정 단계의 제목/부제 텍스트 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof HeadingText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '원하는 공간 정보를 알려주세요',
    subtitle: '입력한 정보로 AI가 스타일을 추천해요',
  },
};
