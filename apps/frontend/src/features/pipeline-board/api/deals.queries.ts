export const dealKeys = {
  all: ['deals'] as const,
  lists: () => [...dealKeys.all, 'list'] as const,
};

export type DealStatus = 'Contacted' | 'Offer sent' | 'Deal closed' | 'Rejected';
export type TagType = 'New lead' | 'Priority' | 'Follow-up';

export interface Deal {
  id: string;
  status: DealStatus;
  tag: TagType;
  company: string;
  description: string;
  assignee?: {
    name: string;
    role: string;
    avatar: string;
  };
  dueDate: string;
  links: string[] | number;
  comments: string[] | number;
  isHighlighted?: boolean;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const fetchDeals = async (): Promise<Deal[]> => {
  const res = await fetch(`${API_BASE_URL}/leads`);
  if (!res.ok) {
    throw new Error('Failed to fetch leads from database');
  }
  const rawLeads = await res.json();
  return rawLeads.map((item: any) => ({
    id: item.id,
    status: item.status as DealStatus,
    tag: item.tag as TagType,
    company: item.company,
    description: item.description,
    dueDate: item.dueDate || 'Today',
    links: item.links || [],
    comments: item.comments || [],
    assignee: item.assigneeName
      ? {
          name: item.assigneeName,
          role: item.assigneeRole || '',
          avatar: item.assigneeAvatar || `https://i.pravatar.cc/150?u=${item.assigneeName.replace(/\s+/g, '')}`,
        }
      : undefined,
  }));
};

export const addDeal = async (newDeal: Omit<Deal, 'id'>): Promise<Deal> => {
  const res = await fetch(`${API_BASE_URL}/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newDeal),
  });

  if (!res.ok) {
    throw new Error('Failed to create lead in database');
  }
  const item = await res.json();
  return {
    id: item.id,
    status: item.status as DealStatus,
    tag: item.tag as TagType,
    company: item.company,
    description: item.description,
    dueDate: item.dueDate || 'Today',
    links: item.links || [],
    comments: item.comments || [],
    assignee: item.assigneeName
      ? {
          name: item.assigneeName,
          role: item.assigneeRole || '',
          avatar: item.assigneeAvatar || `https://i.pravatar.cc/150?u=${item.assigneeName.replace(/\s+/g, '')}`,
        }
      : undefined,
  };
};
