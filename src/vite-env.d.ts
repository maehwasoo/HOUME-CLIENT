/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_FIREBASE_ANALYTICS?: string;
}

declare module '*.svg?react' {
  import * as React from 'react';
  const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >;
  export default ReactComponent;
}
