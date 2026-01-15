import type { Meta, StoryObj } from '@storybook/react-vite';

// 예시 컴포넌트: 간단한 버튼
function HelloWorld() {
  return <button style={{ padding: '8px 16px' }}>안녕, Storybook!</button>;
}

const meta = {
  title: 'example/HelloWorld',
  component: HelloWorld,
  parameters: {
    docs: {
      description: {
        component:
          '스토리가 없을 때 발생하는 빌드 에러를 방지하기 위한 예시 스토리입니다.',
      },
    },
  },
} satisfies Meta<typeof HelloWorld>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
