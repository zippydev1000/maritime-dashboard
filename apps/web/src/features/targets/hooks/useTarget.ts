import { useQuery } from '@tanstack/react-query';
import { fetchTargets } from '../api/targetApi';
import { Target } from '@maritime/common';
import { TARGET_QUERY_KEY } from '../constants';

export const useTargets = () => {
  return useQuery<Target[]>({
    queryKey: TARGET_QUERY_KEY,
    queryFn: fetchTargets,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    select: (data) => [...data],
  });
};
