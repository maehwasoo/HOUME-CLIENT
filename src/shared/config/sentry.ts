import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENVIRONMENT =
  import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE;
const SENTRY_RELEASE =
  import.meta.env.VITE_SENTRY_RELEASE ?? `houme-client@${__APP_VERSION__}`;

export function initSentry() {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
    initialScope: {
      tags: {
        app: 'houme-client',
        mode: import.meta.env.MODE,
      },
    },
  });
}

export function getSentryReactErrorHandlerOptions() {
  if (!SENTRY_DSN) return undefined;

  return {
    onUncaughtError: Sentry.reactErrorHandler(),
    onCaughtError: Sentry.reactErrorHandler(),
    onRecoverableError: Sentry.reactErrorHandler(),
  };
}
