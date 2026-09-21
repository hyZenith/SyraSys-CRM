import { useQuery } from '@tanstack/react-query';
import { dealKeys, fetchDeals } from '../api/deals.queries';

export function useDeals() {
  return useQuery({
    queryKey: dealKeys.lists(),
    queryFn: fetchDeals,
  });
}
