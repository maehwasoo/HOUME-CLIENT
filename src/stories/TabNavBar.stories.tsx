import { useEffect, useState } from 'react';
import type { ComponentProps } from 'react';

import TabNavBar from '@/pages/mypage/components/navBar/TabNavBar';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'pages/mypage/TabNavBar',
  component: TabNavBar,
  tags: ['autodocs'],
  args: {
    onTabChange: () => {},
  },
  argTypes: {
    activeTab: {
      control: { type: 'radio' },
      options: ['savedItems', 'generatedImages'],
    },
    onTabChange: { action: 'tabChange' },
  },
} satisfies Meta<typeof TabNavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

type TabNavBarArgs = ComponentProps<typeof TabNavBar>;

const TabNavBarStory = (args: TabNavBarArgs) => {
  const [activeTab, setActiveTab] = useState(args.activeTab);

  useEffect(() => {
    setActiveTab(args.activeTab);
  }, [args.activeTab]);

  return (
    <TabNavBar
      {...args}
      activeTab={activeTab}
      onTabChange={(tab) => {
        setActiveTab(tab);
        args.onTabChange?.(tab);
      }}
    />
  );
};

export const GeneratedImages: Story = {
  args: {
    activeTab: 'generatedImages',
  },
  render: (args) => <TabNavBarStory {...args} />,
};

export const SavedItems: Story = {
  args: {
    activeTab: 'savedItems',
  },
  render: (args) => <TabNavBarStory {...args} />,
};
