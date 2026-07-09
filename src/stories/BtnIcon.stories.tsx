import BtnIcon from '@components/v2/button/IconButton';

import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta<typeof BtnIcon> = {
  title: 'Components/BtnIcon',
  component: BtnIcon,
};
export default meta;

type Story = StoryObj<typeof BtnIcon>;

const sizes = ['S', 'M', 'L', 'XL'] as const;

// BtnIcon - 전체 케이스
export const AllCases: Story = {
  render: () => (
    <div
      style={{
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '48px',
      }}
    >
      <div>
        <p
          style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '16px' }}
        >
          BtnIcon - 전체 케이스
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              disabled=false / 누르는 동안 PRESSED
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <BtnIcon key={size} name="Search" size={size} />
              ))}
            </div>
          </div>

          <div>
            <p style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              disabled=true
            </p>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {sizes.map((size) => (
                <BtnIcon key={size} name="Search" size={size} disabled={true} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};
