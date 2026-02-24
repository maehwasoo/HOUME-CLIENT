import { MemoryRouter } from 'react-router-dom';

import EmptyStateSection from '@/pages/mypage/components/section/emptyState/EmptyStateSection';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/EmptyStateSection',
  component: EmptyStateSection,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['generatedImages', 'savedItems'],
    },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component: '마이페이지의 빈 상태 안내 섹션입니다.',
      },
    },
  },
} satisfies Meta<typeof EmptyStateSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const GeneratedImages: Story = {
  args: {
    type: 'generatedImages',
  },
};

export const SavedItems: Story = {
  args: {
    type: 'savedItems',
  },
};
