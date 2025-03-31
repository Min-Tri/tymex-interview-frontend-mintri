import { getItems } from '@/lib/api';
import { TFilter } from '@/lib/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';
import useAutoRefresh from './useAutoRefetch';

// Auto refresh interval in milliseconds
const AUTO_REFRESH_INTERVAL = Number(process.env.NEXT_PUBLIC_AUTO_REFRESH_INTERVAL) || 60000;

export function useItems(initialFilters: TFilter) {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<TFilter>(initialFilters);
  const queryClient = useQueryClient();

  const debouncedSetFilters = useCallback(
    debounce((newFilters: TFilter) => {
      setFilters(newFilters);
      setPage(1);
    }, 300),
    []
  );

  const queryKey = ['items', page, filters];

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useQuery({
    queryKey,
    queryFn: () => getItems(page, 12, filters),
    staleTime: AUTO_REFRESH_INTERVAL / 2,
  });

  useAutoRefresh({callback:refetch, interval:AUTO_REFRESH_INTERVAL});
  const loadMore = useCallback(() => {
    if (data?.hasMore && !isFetching) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data?.hasMore, isFetching]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);
    setPage(1);
  }, []);

  const updateFilter = useCallback(
    (key: keyof TFilter, value: any) => {
      debouncedSetFilters({ ...filters, [key]: value });
    },
    [filters, debouncedSetFilters]
  );

  return {
    items: data?.items || [],
    totalCount: data?.total || 0,
    hasMore: data?.hasMore || false,
    isLoading,
    isError,
    error,
    isFetching,
    filters,
    setFilters: debouncedSetFilters,
    updateFilter,
    resetFilters,
    loadMore,
    page,
  };
}

export default useItems;