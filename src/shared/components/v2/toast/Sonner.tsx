import { Toaster } from 'sonner';

import { TOASTER_CONFIGS, TOASTER_DEFAULTS } from '@shared/types/toast';

const MainToaster = () => {
  return (
    <>
      {TOASTER_CONFIGS.map(({ id, position, offset }) => (
        <Toaster
          key={id}
          id={id}
          position={position}
          offset={offset}
          mobileOffset={offset}
          toastOptions={{ unstyled: true }}
          {...TOASTER_DEFAULTS}
        />
      ))}
    </>
  );
};

export default MainToaster;
