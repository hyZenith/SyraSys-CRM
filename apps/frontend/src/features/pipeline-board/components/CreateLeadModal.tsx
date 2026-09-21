import React, { useState } from 'react';
import { TagType } from '../api/deals.queries';
import { useAddDeal } from '../hooks/useAddDeal';

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateLeadModal({ isOpen, onClose }: CreateLeadModalProps) {
  const { mutate: addDeal, isPending } = useAddDeal();
  
  const [formData, setFormData] = useState({
    company: '',
    description: '',
    tag: 'New lead' as TagType,
    assigneeName: '',
    assigneeRole: '',
    dueDate: '',
    links: 0,
    comments: 0
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addDeal(
      {
        status: 'Contacted', // Default to Contacted
        company: formData.company,
        description: formData.description,
        tag: formData.tag,
        dueDate: formData.dueDate || 'Today',
        links: Number(formData.links),
        comments: Number(formData.comments),
        assignee: formData.assigneeName ? {
          name: formData.assigneeName,
          role: formData.assigneeRole,
          avatar: `https://i.pravatar.cc/150?u=${formData.assigneeName.replace(/\s+/g, '')}`
        } : undefined
      },
      {
        onSuccess: () => {
          onClose();
        }
      }
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-[20px] p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[var(--color-ink)]">Add New Lead</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Company Name</label>
            <input required type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea required name="description" value={formData.description} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" rows={3}></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Lead Type</label>
            <select name="tag" value={formData.tag} onChange={handleChange} className="w-full border rounded-lg px-3 py-2">
              <option value="New lead">New lead</option>
              <option value="Priority">Priority</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Assignee Name</label>
              <input type="text" name="assigneeName" value={formData.assigneeName} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Assignee Role</label>
              <input type="text" name="assigneeRole" value={formData.assigneeRole} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="e.g. Sales Manager" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input type="text" name="dueDate" value={formData.dueDate} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" placeholder="13 May" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Links</label>
              <input type="number" name="links" value={formData.links} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Comments</label>
              <input type="number" name="comments" value={formData.comments} onChange={handleChange} className="w-full border rounded-lg px-3 py-2" />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" disabled={isPending} className="px-4 py-2 bg-[var(--color-ink)] text-white rounded-lg hover:opacity-90 disabled:opacity-50">
              {isPending ? 'Saving...' : 'Save Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
