import { DealCard } from './DealCard';
import { Deal } from '../api/deals.queries';

interface PipelineColumnProps {
  title: string;
  count: number;
  deals: Deal[];
}

export function PipelineColumn({ title, count, deals }: PipelineColumnProps) {
  return (
    <div className="flex-1 min-w-[280px]">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="text-[var(--color-ink)] text-xl font-medium">{title}</h3>
        <span className="bg-[var(--color-ink)] text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {deals.length === 0 ? (
          <div className="p-6 border-2 border-dashed border-[var(--color-border)] rounded-[20px] text-center text-xs text-[var(--color-muted)]">
            No {title.toLowerCase()} leads
          </div>
        ) : (
          deals.map(deal => (
            <DealCard key={deal.id} deal={deal} />
          ))
        )}
      </div>
    </div>
  );
}
