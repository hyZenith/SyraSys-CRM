import { useQuery } from '@tanstack/react-query';
import { statsKeys, fetchNewCustomersData } from '../api/stats.queries';

export function useNewCustomersData() {
  return useQuery({
    queryKey: statsKeys.newCustomers(),
    queryFn: fetchNewCustomersData,
    initialData: [], // Default empty array to prevent undefined issues during loading
  });
}
