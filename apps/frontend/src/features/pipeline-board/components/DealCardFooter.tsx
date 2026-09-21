import { Calendar, PieChart, MessageSquareMore } from 'lucide-react';

interface DealCardFooterProps {
  dueDate: string;
  links: number | string[];
  comments: number | string[];
}

export function DealCardFooter({ dueDate, links, comments }: DealCardFooterProps) {
  const linksCount = Array.isArray(links) ? links.length : (links || 0);
  const commentsCount = Array.isArray(comments) ? comments.length : (comments || 0);

  return (
    <div className="flex items-center justify-between text-[var(--color-muted)] text-sm pt-4 border-t border-[var(--color-border)] border-opacity-50 mt-4">
      <div className="flex items-center gap-1.5">
        <Calendar size={16} />
        <span>{dueDate}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5" title={Array.isArray(links) ? links.join('\n') : undefined}>
          <PieChart size={16} />
          <span>{linksCount}</span>
        </div>
        <div className="flex items-center gap-1.5" title={Array.isArray(comments) ? comments.join('\n') : undefined}>
          <MessageSquareMore size={16} />
          <span>{commentsCount}</span>
        </div>
      </div>
    </div>
  );
}
