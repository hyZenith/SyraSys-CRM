import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDeal, Deal } from '../api/deals.queries';
import { dealKeys } from '../api/deals.queries';

export function useAddDeal() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newDeal: Omit<Deal, 'id'>) => addDeal(newDeal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dealKeys.lists() });
    },
  });
}
