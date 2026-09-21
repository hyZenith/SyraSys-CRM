import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  MoreVertical, 
  FileText, 
  Plus, 
  Phone, 
  Calendar, 
  RefreshCw, 
  Send, 
  ExternalLink,
  Trash2,
  Edit2
} from 'lucide-react';
import { useLeadDetail, useUpdateLead, useDeleteLead, Proposal } from '../hooks/useLeadDetails';

interface LeadDetailPanelProps {
  leadId: string;
  onClose: () => void;
}

type TabType = 'overview' | 'proposals' | 'activity' | 'notes';

const STATUS_OPTIONS = ['Contacted', 'Offer sent', 'Deal closed', 'Rejected'];

export function LeadDetailPanel({ leadId, onClose }: LeadDetailPanelProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [showMenu, setShowMenu] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [localNotes, setLocalNotes] = useState<string[]>([]);

  const { data: lead, isLoading, isError, refetch } = useLeadDetail(leadId);
  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();

  // Esc key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Sync comments
  useEffect(() => {
    if (lead?.comments) {
      setLocalNotes(Array.isArray(lead.comments) ? lead.comments : []);
    }
  }, [lead]);

  const handleStatusChange = (newStatus: string) => {
    if (!lead) return;
    updateLeadMutation.mutate({
      id: lead.id,
      data: { status: newStatus },
    });
  };

  const handleDeleteLead = () => {
    if (confirm('Are you sure you want to delete this lead?')) {
      deleteLeadMutation.mutate(leadId, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !lead) return;
    const updated = [newNote.trim(), ...localNotes];
    setLocalNotes(updated);
    updateLeadMutation.mutate({
      id: lead.id,
      data: { comments: updated },
    });
    setNewNote('');
  };

  // Helper for initials
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Status Badge Colors (Minimal light theme)
  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case 'Contacted':
        return 'bg-[#EAEAEA] text-[#111111]';
      case 'Offer sent':
      case 'Proposal Sent':
        return 'bg-[#FFF7E6] text-[#111111] border border-[#FFE7B8]';
      case 'Deal closed':
      case 'Won':
        return 'bg-[#E9F7EE] text-[#111111] border border-[#BDE8CB]';
      case 'Rejected':
        return 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]';
      default:
        return 'bg-[#F2F2F2] text-[#111111]';
    }
  };

  const proposalsCount = lead?.proposals?.length || 0;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/25 transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="relative z-10 w-full max-w-[420px] bg-white h-full shadow-2xl flex flex-col transform transition-transform duration-220 ease-out animate-slide-in-right">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E5E5]">
          <button 
            onClick={onClose}
            className="text-[#6B6B6B] hover:text-[#111111] transition-colors p-1 rounded-md hover:bg-[#F5F5F5]"
            title="Close (Esc)"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-[#6B6B6B] uppercase tracking-wider">Lead Detail</span>
            <div className="relative">
              <button 
                onClick={() => setShowMenu(!showMenu)}
                className="text-[#6B6B6B] hover:text-[#111111] p-1 rounded-md hover:bg-[#F5F5F5] transition-colors"
              >
                <MoreVertical size={20} />
              </button>
              
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1 z-20">
                  <button 
                    onClick={() => { setShowMenu(false); alert('Editing lead'); }}
                    className="w-full px-4 py-2 text-left text-sm text-[#111111] hover:bg-[#F5F5F5] flex items-center gap-2"
                  >
                    <Edit2 size={16} /> Edit Lead
                  </button>
                  <button 
                    onClick={handleDeleteLead}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <Trash2 size={16} /> Delete Lead
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Body */}
        {isLoading ? (
          <div className="p-6 space-y-4 animate-pulse">
            <div className="h-10 bg-[#F2F2F2] rounded-lg w-3/4"></div>
            <div className="h-6 bg-[#F2F2F2] rounded-lg w-1/2"></div>
            <div className="h-24 bg-[#F2F2F2] rounded-lg w-full mt-6"></div>
          </div>
        ) : isError || !lead ? (
          <div className="p-6 text-center text-[#6B6B6B]">
            <p className="mb-4">Failed to load lead details.</p>
            <button 
              onClick={() => refetch()} 
              className="px-4 py-2 bg-[#111111] text-white rounded-lg text-sm font-medium inline-flex items-center gap-2"
            >
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        ) : (
          <>
            {/* Lead Identity Block */}
            <div className="px-6 py-5 border-b border-[#E5E5E5] bg-[#FAFAFA]">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {lead.assigneeAvatar ? (
                    <img src={lead.assigneeAvatar} alt={lead.company} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    getInitials(lead.company)
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-[#111111] truncate">{lead.company}</h2>
                  <p className="text-xs text-[#6B6B6B] truncate">{lead.description || 'Web & System Implementation'}</p>
                </div>
              </div>

              {/* Badges & Status Row */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2">
                <div className="flex items-center gap-2">
                  {/* Status selector dropdown */}
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className={`text-xs font-semibold px-3 py-1 rounded-full cursor-pointer transition-colors outline-none appearance-none ${getStatusBadgeStyle(lead.status)}`}
                  >
                    {STATUS_OPTIONS.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>

                  {/* Source tag */}
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full border border-[#E5E5E5] text-[#6B6B6B] bg-white">
                    {lead.tag || 'Referral'}
                  </span>
                </div>

                {lead.assigneeName && (
                  <div className="flex items-center gap-1.5 text-xs text-[#6B6B6B]">
                    <span className="w-5 h-5 rounded-full bg-[#E5E5E5] text-[#111111] flex items-center justify-center font-semibold text-[10px]">
                      {getInitials(lead.assigneeName)}
                    </span>
                    <span>{lead.assigneeName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-[#E5E5E5] px-6 bg-white shrink-0">
              {(['overview', 'proposals', 'activity', 'notes'] as TabType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-3 text-xs font-semibold capitalize relative transition-colors ${
                    activeTab === tab ? 'text-[#111111]' : 'text-[#6B6B6B] hover:text-[#111111]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {tab}
                    {tab === 'proposals' && proposalsCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-[#111111] text-white text-[10px] flex items-center justify-center font-bold">
                        {proposalsCount}
                      </span>
                    )}
                  </span>
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#111111]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Contents Scrollable */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-3">About Lead</h4>
                    <p className="text-sm text-[#111111] leading-relaxed bg-[#FAFAFA] p-3 rounded-xl border border-[#E5E5E5]">
                      {lead.description || 'No description provided.'}
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-2">Details</h4>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B]">Company</span>
                      <span className="font-medium text-[#111111]">{lead.company}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B]">Status</span>
                      <span className="font-medium text-[#111111]">{lead.status}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B]">Target Date</span>
                      <span className="font-medium text-[#111111]">{lead.dueDate || '13 May'}</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-[#E5E5E5] text-sm">
                      <span className="text-[#6B6B6B]">Assigned Rep</span>
                      <span className="font-medium text-[#111111]">{lead.assigneeName || 'Unassigned'}</span>
                    </div>
                  </div>

                  {lead.links && lead.links.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider mb-2">Attached Links</h4>
                      <div className="space-y-1.5">
                        {lead.links.map((link, idx) => (
                          <a 
                            key={idx}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-xs text-[#111111] hover:underline p-2 rounded-lg bg-[#FAFAFA] border border-[#E5E5E5]"
                          >
                            <ExternalLink size={14} className="text-[#6B6B6B]" />
                            <span className="truncate">{link}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* PROPOSALS TAB */}
              {activeTab === 'proposals' && (
                <div>
                  {proposalsCount === 0 ? (
                    /* Default Empty State */
                    <div className="py-12 flex flex-col items-center justify-center text-center border-2 border-dashed border-[#E5E5E5] rounded-2xl p-6 bg-[#FAFAFA]">
                      <div className="w-12 h-12 rounded-full bg-[#EAEAEA] flex items-center justify-center mb-4 text-[#111111]">
                        <FileText size={24} />
                      </div>
                      <h3 className="text-base font-bold text-[#111111] mb-1 text-center w-full">No proposal sent yet</h3>
                      <p className="text-xs text-[#6B6B6B] mb-6 w-full max-w-[280px] text-center leading-relaxed">
                        Create and track quotes or proposal PDFs for {lead.company}.
                      </p>
                      <button
                        onClick={() => navigate(`/leads/${lead.id}/proposals/create`)}
                        className="px-5 py-2.5 bg-[#111111] text-white text-xs font-bold rounded-xl hover:opacity-90 transition-opacity inline-flex items-center gap-2 shadow-sm"
                      >
                        <Plus size={16} /> Create Proposal
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-[#6B6B6B] uppercase tracking-wider">Linked Proposals ({proposalsCount})</span>
                        <button
                          onClick={() => navigate(`/leads/${lead.id}/proposals/create`)}
                          className="px-3 py-1.5 bg-[#111111] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity inline-flex items-center gap-1.5"
                        >
                          <Plus size={14} /> New Proposal
                        </button>
                      </div>

                      {lead.proposals.map((prop: Proposal) => (
                        <div key={prop.id} className="p-4 rounded-xl border border-[#E5E5E5] bg-white hover:border-[#111111] transition-colors shadow-sm">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-[#F2F2F2] flex items-center justify-center text-[#111111]">
                                <FileText size={18} />
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-[#111111]">{prop.title}</h4>
                                <p className="text-xs text-[#6B6B6B]">
                                  ${prop.totalAmount.toLocaleString()} {prop.currency}
                                </p>
                              </div>
                            </div>
                            <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${getStatusBadgeStyle(prop.status)}`}>
                              {prop.status}
                            </span>
                          </div>

                          {prop.description && (
                            <p className="text-xs text-[#6B6B6B] mb-3 line-clamp-2">{prop.description}</p>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-[#E5E5E5] text-[11px] text-[#6B6B6B]">
                            <span>Created {new Date(prop.createdAt).toLocaleDateString()}</span>
                            <div className="flex items-center gap-2">
                              {prop.pdfUrl && (
                                <a 
                                  href={prop.pdfUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[#111111] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                  PDF <ExternalLink size={12} />
                                </a>
                              )}
                              {prop.documentUrl && (
                                <a 
                                  href={prop.documentUrl} 
                                  target="_blank" 
                                  rel="noreferrer"
                                  className="text-[#111111] font-medium hover:underline inline-flex items-center gap-1"
                                >
                                  Doc <ExternalLink size={12} />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ACTIVITY TAB */}
              {activeTab === 'activity' && (
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-[#E5E5E5] space-y-6">
                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#111111] text-white flex items-center justify-center text-[10px]">
                        <RefreshCw size={10} />
                      </div>
                      <p className="text-xs font-bold text-[#111111]">Status updated to {lead.status}</p>
                      <p className="text-[11px] text-[#6B6B6B]">by {lead.assigneeName || 'System Admin'}</p>
                      <span className="text-[10px] text-[#6B6B6B] block mt-1">Recently</span>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#EAEAEA] text-[#111111] flex items-center justify-center text-[10px]">
                        <Phone size={10} />
                      </div>
                      <p className="text-xs font-bold text-[#111111]">Discovery call logged</p>
                      <p className="text-[11px] text-[#6B6B6B]">Discussed scope and project milestones.</p>
                      <span className="text-[10px] text-[#6B6B6B] block mt-1">2 days ago</span>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-[#EAEAEA] text-[#111111] flex items-center justify-center text-[10px]">
                        <Calendar size={10} />
                      </div>
                      <p className="text-xs font-bold text-[#111111]">Lead Created</p>
                      <p className="text-[11px] text-[#6B6B6B]">Added to pipeline under {lead.tag}.</p>
                      <span className="text-[10px] text-[#6B6B6B] block mt-1">{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* NOTES TAB */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <form onSubmit={handleAddNote} className="space-y-2">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add an internal note..."
                      rows={3}
                      className="w-full text-xs p-3 rounded-xl border border-[#E5E5E5] focus:border-[#111111] outline-none resize-none"
                    />
                    <button
                      type="submit"
                      disabled={!newNote.trim()}
                      className="px-4 py-2 bg-[#111111] text-white text-xs font-bold rounded-xl disabled:opacity-40 hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 ml-auto block"
                    >
                      <Send size={12} /> Post Note
                    </button>
                  </form>

                  <div className="space-y-3 pt-2">
                    {localNotes.length === 0 ? (
                      <p className="text-xs text-[#6B6B6B] text-center py-6">No internal notes yet.</p>
                    ) : (
                      localNotes.map((note, idx) => (
                        <div key={idx} className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E5E5E5] text-xs text-[#111111]">
                          <p className="leading-relaxed">{note}</p>
                          <span className="text-[10px] text-[#6B6B6B] block mt-2">Internal Note</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
