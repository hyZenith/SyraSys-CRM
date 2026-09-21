import { TagType } from '../api/deals.queries';

interface StatusTagProps {
  tag: TagType;
}

export function StatusTag({ tag }: StatusTagProps) {
  const getStyles = () => {
    switch (tag) {
      case 'New lead':
        return 'bg-[var(--color-tag-newlead-bg)] text-[var(--color-tag-newlead-text)]';
      case 'Priority':
        return 'bg-[var(--color-tag-priority-bg)] text-[var(--color-tag-priority-text)]';
      case 'Follow-up':
        return 'bg-[var(--color-tag-followup-bg)] text-[var(--color-tag-followup-text)]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStyles()}`}>
      {tag}
    </span>
  );
}
