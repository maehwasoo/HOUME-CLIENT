// import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import 'sonner/dist/styles.css';

import { initClarity } from '@shared/config/clarity';
import {
  getSentryReactErrorHandlerOptions,
  initSentry,
} from '@shared/config/sentry';

import { queryClient } from '@apis/config/queryClient';

import AppErrorFallback from '@components/errorFallback/AppErrorFallback';
import MainToaster from '@components/v2/toast/Sonner';
import '@styles/global.css';

import App from './App';

initSentry();
initClarity();

// 개발 모드: 최초 진입 시 ?ab=single|multiple 을 로컬스토리지에 저장
if (import.meta.env.DEV) {
  try {
    const sp = new URLSearchParams(window.location.search);
    const ab = sp.get('ab');
    if (ab === 'single' || ab === 'multiple') {
      localStorage.setItem('ab_image_variant', ab);
    }
  } catch {
    console.error('Error setting ab_image_variant');
  }
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement, getSentryReactErrorHandlerOptions()).render(
  // <StrictMode>
  <ErrorBoundary FallbackComponent={AppErrorFallback}>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <App />
        <MainToaster />
        {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </HelmetProvider>
  </ErrorBoundary>
  // </StrictMode>
);
