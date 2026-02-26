import { http, HttpResponse } from 'msw';
import { fn } from 'storybook/test';

import HouseInfo from '@pages/imageSetup/steps/houseInfo/HouseInfo';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof HouseInfo> = {
  title: 'pages/imageSetup/HouseInfo',
  component: HouseInfo,
  tags: ['autodocs'],
  args: {
    context: {},
    onNext: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof HouseInfo>;

// MSW 기본 핸들러(handlers.ts)가 성공 응답을 반환
export const Success: Story = {};

// 로딩 상태: 응답을 무기한 지연시켜 isPending=true 유지
export const Loading: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/housing-options', () => {
          return new Promise(() => {});
        }),
      ],
    },
  },
};

// 에러 상태: 500 응답으로 isError=true 유발
export const Error: Story = {
  parameters: {
    msw: {
      handlers: [
        http.get('*/api/v1/housing-options', () => {
          return HttpResponse.json(
            { message: 'Server Error' },
            { status: 500 }
          );
        }),
      ],
    },
  },
};
