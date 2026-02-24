import FeatureErrorFallback from '@components/errorFallback/FeatureErrorFallback';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'shared/errorFallback/FeatureErrorFallback',
  component: FeatureErrorFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Feature 영역 에러 시 표시되는 인라인 에러 화면입니다. NavBar는 유지되고 콘텐츠 영역만 이 fallback으로 대체됩니다.',
      },
    },
  },
  args: {
    error: new Error('테스트 에러'),
    resetErrorBoundary: () => {
      alert('resetErrorBoundary 호출됨');
    },
  },
} satisfies Meta<typeof FeatureErrorFallback>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
