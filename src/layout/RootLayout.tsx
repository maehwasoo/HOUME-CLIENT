import { Outlet } from 'react-router-dom';

import { useScrollToTop } from '@/shared/hooks/useScrollToTop';

import { useGenerateWarmup } from '@pages/generate/hooks/useGenerateWarmup';

function RootLayout() {
  // 라우트/쿼리/해시/키 변화와 초기 마운트 시 스크롤 최상단으로 이동
  useScrollToTop();
  useGenerateWarmup();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Outlet />
    </div>
  );
}

export default RootLayout;
