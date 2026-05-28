import type { CSSProperties } from 'react';

import { Toaster } from 'sonner';

import { TOASTER_CONFIGS, TOASTER_DEFAULTS } from '@shared/types/toast';

import { unitVars } from '@styles/tokensV2/unit.css';

const TOASTER_SIDE_MARGIN = '2rem';

const toasterStyle = {
  width: `calc(100dvw - ${TOASTER_SIDE_MARGIN} * 2)`,
  maxWidth: `calc(${unitVars.unit.dimension.wMax} - ${TOASTER_SIDE_MARGIN} * 2)`,
  left: '50%',
  right: 'auto',
  transform: 'translateX(-50%)',
} satisfies CSSProperties;

const MainToaster = () => {
  return (
    <>
      {TOASTER_CONFIGS.map(({ id, position, offset }) => (
        <Toaster
          key={id}
          id={id}
          position={position}
          offset={offset}
          mobileOffset={{ ...offset, left: '0rem', right: '0rem' }}
          style={toasterStyle}
          toastOptions={{ unstyled: true }}
          {...TOASTER_DEFAULTS}
        />
      ))}
    </>
  );
};

export default MainToaster;
