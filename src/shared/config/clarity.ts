type ClarityFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    clarity?: ClarityFn & { q?: unknown[][] };
  }
}

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID?.trim();

export function initClarity() {
  if (!CLARITY_PROJECT_ID) return;

  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }

  // HMR guard
  if (document.querySelector('script[data-houme-clarity="true"]')) {
    return;
  }

  window.clarity =
    window.clarity ||
    function (...args: unknown[]) {
      (window.clarity!.q = window.clarity!.q || []).push(args);
    };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
  script.dataset.houmeClarity = 'true';

  document.head.appendChild(script);
}
