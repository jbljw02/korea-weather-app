import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 3,
            refetchOnWindowFocus: false,
            staleTime: 5 * 60 * 1000, // 날씨 데이터는 자주 바뀌지 않으므로, 5분 캐시
        },
    },
});

interface QueryProviderProps {
    children: ReactNode;
}

export const QueryProvider = ({ children }: QueryProviderProps) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
