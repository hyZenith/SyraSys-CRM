import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MoreHorizontal, ArrowRight, XCircle } from 'lucide-react';
import { Deal } from '../api/deals.queries';
import { StatusTag } from './StatusTag';
import { DealCardFooter } from './DealCardFooter';
import { useUpdateLead } from '../hooks/useLeadDetails';

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  const [, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const updateLead = useUpdateLead();

  const handleCardClick = () => {
    setSearchParams({ lead: deal.id });
  };

  const handleMoveStatus = (e: React.MouseEvent, newStatus: string) => {
    e.stopPropagation();
    updateLead.mutate({ id: deal.id, data: { status: newStatus } });
    setShowMenu(false);
  };

  // Close menu on outside click
  useEffect(() => {
    if (!showMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showMenu]);

  const moveOptions = [
    { label: 'Move to Offer sent', status: 'Offer sent' },
    { label: 'Move to Deal closed', status: 'Deal closed' },
    { label: 'Reject deal', status: 'Rejected' },
  ].filter(opt => opt.status !== deal.status);

  return (
    <div
      onClick={handleCardClick}
      className={`rounded-[20px] p-5 border cursor-pointer hover:border-[#111111] transition-all hover:shadow-md ${
        deal.isHighlighted ? 'bg-[#EAF2FF] border-[#B9CFFF]' : 'bg-white border-[var(--color-border)]'
      }`}
    >
      <div className="flex justify-between items-start mb-4">
        <StatusTag tag={deal.tag} />
        <div className="relative" ref={menuRef}>
          <button
            onClick={(e) => { e.stopPropagation(); setShowMenu(prev => !prev); }}
            className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors p-1 rounded-md hover:bg-[#F5F5F5]"
          >
            <MoreHorizontal size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-8 z-20 w-48 bg-white border border-[#E5E5E5] rounded-xl shadow-lg py-1 animate-fade-in">
              {moveOptions.map(opt => (
                <button
                  key={opt.status}
                  onClick={(e) => handleMoveStatus(e, opt.status)}
                  className={`w-full px-4 py-2 text-left text-xs font-semibold hover:bg-[#F5F5F5] flex items-center gap-2 transition-colors ${
                    opt.status === 'Rejected'
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-[#111111]'
                  }`}
                >
                  {opt.status === 'Rejected'
                    ? <XCircle size={14} />
                    : <ArrowRight size={14} />
                  }
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <h4 className="text-[var(--color-ink)] font-bold text-lg mb-2">{deal.company}</h4>
      <p className="text-[var(--color-muted)] text-sm mb-5 leading-relaxed">{deal.description}</p>

      {deal.assignee && (
        <div className="flex items-center gap-3">
          <img src={deal.assignee.avatar} alt={deal.assignee.name} className="w-9 h-9 rounded-full" />
          <div>
            <p className="text-[var(--color-ink)] font-bold text-sm">{deal.assignee.name}</p>
            <p className="text-[var(--color-muted)] text-xs">{deal.assignee.role}</p>
          </div>
        </div>
      )}

      <DealCardFooter
        dueDate={deal.dueDate}
        links={deal.links}
        comments={deal.comments}
      />
    </div>
  );
}
