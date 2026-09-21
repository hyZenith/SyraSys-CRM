import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Link, DollarSign, Calendar, Save } from 'lucide-react';
import { useCreateProposal, useLeadDetail } from '../../features/pipeline-board/hooks/useLeadDetails';

export function CreateProposalPage() {
  const { leadId } = useParams<{ leadId: string }>();
  const navigate = useNavigate();
  const { data: lead } = useLeadDetail(leadId || null);
  const createProposalMutation = useCreateProposal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [status, setStatus] = useState<'Draft' | 'Sent' | 'Accepted' | 'Declined'>('Draft');
  const [dueDate, setDueDate] = useState('');
  const [documentUrl, setDocumentUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadId) return;

    createProposalMutation.mutate(
      {
        leadId,
        data: {
          title: title || `${lead?.company || 'Lead'} Proposal`,
          description,
          totalAmount: parseFloat(totalAmount) || 0,
          currency,
          status,
          dueDate: dueDate || null,
          documentUrl: documentUrl || null,
          pdfUrl: pdfUrl || null,
        },
      },
      {
        onSuccess: () => {
          // Redirect back to lead page with detail panel open
          navigate(`/leads?lead=${leadId}`);
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] p-8 max-w-4xl mx-auto">
      {/* Back Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(`/leads?lead=${leadId}`)}
          className="p-2 rounded-xl bg-white border border-[#E5E5E5] text-[#111111] hover:bg-[#F2F2F2] transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-[#111111]">Create Proposal</h1>
          <p className="text-sm text-[#6B6B6B]">
            {lead ? `Generate a quote or proposal for ${lead.company}` : 'Link a new proposal to lead'}
          </p>
        </div>
      </div>

      {/* Main Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#E5E5E5] p-8 shadow-sm space-y-6">
        {/* Proposal Title */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Proposal Title *
          </label>
          <div className="relative">
            <FileText size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={lead ? `${lead.company} - Web & CRM Implementation` : 'e.g. Enterprise Solution Proposal'}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
            />
          </div>
        </div>

        {/* Description / Scope */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Proposal Scope & Details
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Outline project deliverables, terms, and key milestones..."
            className="w-full p-4 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] resize-none"
          />
        </div>

        {/* Pricing Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
              Total Amount ($) *
            </label>
            <div className="relative">
              <DollarSign size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <input
                type="number"
                step="0.01"
                required
                value={totalAmount}
                onChange={(e) => setTotalAmount(e.target.value)}
                placeholder="4500.00"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] bg-white"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="CAD">CAD ($)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
              Proposal Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111] bg-white"
            >
              <option value="Draft">Draft</option>
              <option value="Sent">Sent</option>
              <option value="Accepted">Accepted</option>
              <option value="Declined">Declined</option>
            </select>
          </div>
        </div>

        {/* Due Date */}
        <div>
          <label className="block text-xs font-bold text-[#111111] uppercase tracking-wider mb-2">
            Expiration / Due Date
          </label>
          <div className="relative">
            <Calendar size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="pt-4 border-t border-[#E5E5E5] space-y-4">
          <h3 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">Document Links & Attachments</h3>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">Proposal Document URL</label>
            <div className="relative">
              <Link size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <input
                type="url"
                value={documentUrl}
                onChange={(e) => setDocumentUrl(e.target.value)}
                placeholder="https://docs.google.com/document/d/..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#111111] mb-1">Proposal PDF File Link</label>
            <div className="relative">
              <Link size={18} className="absolute left-3.5 top-3.5 text-[#6B6B6B]" />
              <input
                type="url"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="https://storage.syracrm.com/proposals/proposal_v1.pdf"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none text-sm text-[#111111]"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E5E5E5]">
          <button
            type="button"
            onClick={() => navigate(`/leads?lead=${leadId}`)}
            className="px-6 py-3 rounded-xl border border-[#E5E5E5] text-sm font-semibold text-[#6B6B6B] hover:bg-[#F2F2F2] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createProposalMutation.isPending}
            className="px-6 py-3 rounded-xl bg-[#111111] text-white text-sm font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            <Save size={16} /> {createProposalMutation.isPending ? 'Saving...' : 'Save & Link Proposal'}
          </button>
        </div>
      </form>
    </div>
  );
}
