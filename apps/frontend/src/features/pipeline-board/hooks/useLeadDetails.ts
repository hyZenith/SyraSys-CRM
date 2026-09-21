import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dealKeys } from '../api/deals.queries';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface Proposal {
  id: string;
  leadId: string;
  title: string;
  description: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Declined';
  totalAmount: number;
  currency: string;
  dueDate?: string | null;
  documentUrl?: string | null;
  pdfUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DetailedLead {
  id: string;
  status: string;
  tag: string;
  company: string;
  description: string;
  dueDate?: string | null;
  links: string[];
  comments: string[];
  assignedUserId?: string | null;
  assigneeName?: string | null;
  assigneeRole?: string | null;
  assigneeAvatar?: string | null;
  proposals: Proposal[];
  createdAt: string;
  updatedAt: string;
}

export function useLeadDetail(leadId: string | null) {
  return useQuery({
    queryKey: ['lead', leadId],
    queryFn: async (): Promise<DetailedLead> => {
      if (!leadId) throw new Error('Lead ID is required');
      const res = await fetch(`${API_BASE_URL}/leads/${leadId}`);
      if (!res.ok) {
        throw new Error('Failed to fetch lead details');
      }
      return res.json();
    },
    enabled: !!leadId,
  });
}

export function useUpdateLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<DetailedLead> }) => {
      const res = await fetch(`${API_BASE_URL}/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to update lead');
      }
      return res.json();
    },
    onSuccess: (updatedLead) => {
      queryClient.invalidateQueries({ queryKey: dealKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['lead', updatedLead.id] });
    },
  });
}

export function useDeleteLead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (leadId: string) => {
      const res = await fetch(`${API_BASE_URL}/leads/${leadId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('Failed to delete lead');
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: dealKeys.lists() });
    },
  });
}

export function useCreateProposal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ leadId, data }: { leadId: string; data: Omit<Proposal, 'id' | 'leadId' | 'createdAt' | 'updatedAt'> }) => {
      const res = await fetch(`${API_BASE_URL}/leads/${leadId}/proposals`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error('Failed to create proposal');
      }
      return res.json();
    },
    onSuccess: (_, { leadId }) => {
      queryClient.invalidateQueries({ queryKey: dealKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ['lead', leadId] });
      queryClient.invalidateQueries({ queryKey: ['proposals', leadId] });
    },
  });
}
