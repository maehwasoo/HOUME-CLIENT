import type { AuthEnvironment } from '../types/environment';

export const getAuthEnvironment = (hostname: string): AuthEnvironment => {
  if (hostname === 'localhost') {
    return 'local';
  }

  if (hostname === 'preview.houme.kr') {
    return 'preview';
  }

  return 'prod';
};
