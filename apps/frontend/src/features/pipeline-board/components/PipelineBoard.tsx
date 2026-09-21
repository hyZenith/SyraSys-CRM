import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw, Eye, EyeOff, XCircle } from 'lucide-react';
import { useDeals } from '../hooks/useDeals';
import { PipelineColumn } from './PipelineColumn';
import { LeadDetailPanel } from './LeadDetailPanel';
import { DealCard } from './DealCard';

export function PipelineBoard() {
  const { data: deals = [], isLoading, isError, refetch } = useDeals();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showRejected, setShowRejected] = useState(false);
  const activeLeadId = searchParams.get('lead');

  const columns = [
    { title: 'Contacted', status: 'Contacted', count: deals.filter(d => d.status === 'Contacted').length },
    { title: 'Offer sent', status: 'Offer sent', count: deals.filter(d => d.status === 'Offer sent').length },
    { title: 'Deal closed', status: 'Deal closed', count: deals.filter(d => d.status === 'Deal closed').length },
  ];

  const rejectedDeals = deals.filter(d => d.status === 'Rejected');

  const handleClosePanel = () => {
    searchParams.delete('lead');
    setSearchParams(searchParams);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12 text-[var(--color-muted)]">
        <RefreshCw size={24} className="animate-spin mr-2" /> Loading leads...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-[var(--color-muted)]">
        <p className="mb-4">Failed to load leads.</p>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-[var(--color-ink)] text-white rounded-lg text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pr-8">

      {/* Toggle button for rejected deals */}
      <div className="flex justify-end items-center">
        <button
          onClick={() => setShowRejected(prev => !prev)}
          className="px-4 py-2 bg-white border border-[var(--color-border)] rounded-xl text-xs font-semibold text-[var(--color-ink)] hover:bg-[#F5F5F5] transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
        >
          {showRejected ? <EyeOff size={15} /> : <Eye size={15} />}
          <span>
            {showRejected
              ? 'Hide Rejected Deals'
              : `Show Rejected Deals (${rejectedDeals.length})`}
          </span>
        </button>
      </div>

      {/* Main Pipeline Columns */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map(col => (
          <PipelineColumn
            key={col.title}
            title={col.title}
            count={col.count}
            deals={deals.filter(deal => deal.status === col.status)}
          />
        ))}
      </div>

      {/* Hidden Rejected Deals Section */}
      {showRejected && (
        <div className="pt-6 border-t border-[var(--color-border)] animate-fade-in">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FEE2E2] flex items-center justify-center text-red-600">
              <XCircle size={16} />
            </div>
            <div>
              <h3 className="text-xl font-medium text-[var(--color-ink)]">Rejected Deals</h3>
              <p className="text-xs text-[var(--color-muted)]">Deals that were declined or did not progress</p>
            </div>
            <span className="bg-[var(--color-muted)] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ml-2">
              {rejectedDeals.length}
            </span>
          </div>

          {rejectedDeals.length === 0 ? (
            <div className="p-8 border-2 border-dashed border-[var(--color-border)] rounded-[20px] text-center text-xs text-[var(--color-muted)] max-w-md">
              No rejected deals yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rejectedDeals.map(deal => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lead Detail Side Panel */}
      {activeLeadId && (
        <LeadDetailPanel
          leadId={activeLeadId}
          onClose={handleClosePanel}
        />
      )}
    </div>
  );
}
