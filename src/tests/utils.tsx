import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 테스트별 격리를 위한 QueryClient 팩토리
// retry: false → 에러 케이스에서 재시도 없이 즉시 실패
export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
