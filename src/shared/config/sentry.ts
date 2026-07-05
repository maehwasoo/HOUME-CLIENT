import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;
const SENTRY_ENVIRONMENT =
  import.meta.env.VITE_SENTRY_ENVIRONMENT ?? import.meta.env.MODE;
const SENTRY_RELEASE =
  import.meta.env.VITE_SENTRY_RELEASE ?? `houme-client@${__APP_VERSION__}`;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 에러 리포트에서 토큰·민감 헤더를 제거
function scrubSensitiveData(event: Sentry.ErrorEvent): Sentry.ErrorEvent {
  const headers = event.request?.headers;
  if (headers) {
    delete headers['Authorization'];
    delete headers['authorization'];
  }
  // withCredentials: true라 쿠키에 refresh token이 있을 수 있어 통째로 제거
  if (event.request?.cookies) {
    delete event.request.cookies;
  }
  return event;
}

export function initSentry() {
  if (!SENTRY_DSN) return;

  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
    // 로컬 개발(pnpm dev)에서는 이벤트를 전송하지 않음
    enabled: !import.meta.env.DEV,

    // ── 성능 추적 (tracing) ──
    integrations: [Sentry.browserTracingIntegration()],
    // 프로덕션은 10%만 샘플링(무료 플랜 quota라 한도 고려), 그 외 환경은 전량 수집
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // trace 헤더(sentry-trace/baggage)를 전파할 대상 — API 도메인
    tracePropagationTargets: API_BASE_URL ? [API_BASE_URL] : [],

    // ── 개인정보·토큰 보호 ──
    sendDefaultPii: false,
    // SESSION_EXPIRED는 정상 로그아웃 플로우라 리포트에서 제외
    ignoreErrors: [/SESSION_EXPIRED/],
    beforeSend: scrubSensitiveData,

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
