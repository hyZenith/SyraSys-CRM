import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

export interface Contract {
  id: string;
  title: string;
  status: "Draft" | "Active" | "Expired" | "Terminated";
  value: number;
  startDate: string;
  endDate?: string | null;
  documentUrl?: string | null;
  createdAt: string;
}

export interface Nda {
  id: string;
  title: string;
  status: "Pending" | "Signed" | "Expired";
  signedDate?: string | null;
  documentUrl?: string | null;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: "Draft" | "Pending" | "Paid" | "Overdue";
  dueDate: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  status: "Completed" | "Pending" | "Failed";
  paidAt: string;
}

export interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string | null;
  status: "Active" | "Inactive" | "Onboarding" | "Regular";
  tag: string;
  avatar?: string | null;
  description?: string | null;
  assigneeName?: string | null;
  assigneeRole?: string | null;
  assigneeAvatar?: string | null;
  contracts?: Contract[];
  ndas?: Nda[];
  invoices?: Invoice[];
  payments?: Payment[];
  createdAt: string;
}

export const customerKeys = {
  all: ["customers"] as const,
  lists: () => [...customerKeys.all, "list"] as const,
  detail: (id: string | null) => [...customerKeys.all, "detail", id] as const,
};

export function useCustomers() {
  return useQuery({
    queryKey: customerKeys.lists(),
    queryFn: async (): Promise<Customer[]> => {
      const res = await fetch(`${API_BASE_URL}/customers`);
      if (!res.ok) throw new Error("Failed to fetch customers");
      return res.json();
    },
  });
}

export function useCustomerDetail(id: string | null) {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: async (): Promise<Customer> => {
      if (!id) throw new Error("Customer ID is required");
      const res = await fetch(`${API_BASE_URL}/customers/${id}`);
      if (!res.ok) throw new Error("Failed to fetch customer details");
      return res.json();
    },
    enabled: !!id,
  });
}

export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Customer> }) => {
      const res = await fetch(`${API_BASE_URL}/customers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to update customer");
      return res.json();
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
      queryClient.invalidateQueries({ queryKey: customerKeys.detail(updated.id) });
    },
  });
}

export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_BASE_URL}/customers/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete customer");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: customerKeys.lists() });
    },
  });
}
