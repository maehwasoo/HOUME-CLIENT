/**
 * MSW - HTTP 요청을 가짜로 가로채는 서버
 */

import { setupServer } from 'msw/node';

import { handlers } from './handlers';

export const server = setupServer(...handlers);
