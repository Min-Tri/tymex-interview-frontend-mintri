import { getItems } from '@/lib/api';
import { TFilter, TItemsResponse } from '@/lib/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import useAutoRefresh from './useAutoRefetch';

// Auto refresh interval in milliseconds
const AUTO_REFRESH_INTERVAL = Number(process.env.NEXT_PUBLIC_AUTO_REFRESH_INTERVAL) || 60000;

export function useItems(initialFilters: TFilter) {
  const [filters, setFilters] = useState<TFilter>(initialFilters);

  const debouncedSetFilters = useCallback(
    debounce((newFilters: TFilter) => {
      setFilters(newFilters);
    }, 700),
    []
  );

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery<TItemsResponse>({
    queryKey: ['items', filters],
    queryFn: ({ pageParam }) => getItems(pageParam as number, 12, filters),
    getNextPageParam: (lastPage: TItemsResponse, pages) => {
      if (lastPage.hasMore) {
        return pages.length + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: AUTO_REFRESH_INTERVAL / 2,
  });

  useAutoRefresh({ callback: refetch, interval: AUTO_REFRESH_INTERVAL,enabled: !isFetching });

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const updateFilter = useCallback(
    (key: keyof TFilter, value: any) => {
      debouncedSetFilters({ ...filters, [key]: value });
    },
    [filters, debouncedSetFilters]
  );

  const items = data?.pages.reduce((acc, page) => [...acc, ...page.items], [] as any[]) || [];
  const totalCount = data?.pages[0]?.total || 0;

  return {
    items,
    totalCount,
    hasMore: hasNextPage,
    isLoading,
    isError,
    error,
    isFetching: isFetchingNextPage,
    filters,
    setFilters: debouncedSetFilters,
    updateFilter,
    resetFilters,
    loadMore
  };
}

export default useItems;