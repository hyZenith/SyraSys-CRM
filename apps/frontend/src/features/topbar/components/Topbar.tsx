import { SearchCustomerInput } from './SearchCustomerInput';
import { AddCustomerButton } from './AddCustomerButton';
import { SlidersHorizontal, Filter } from 'lucide-react';

export function Topbar() {
  return (
    <header className="px-8 pt-8 pb-4 flex items-center gap-4">
      <div className="flex-1">
        <SearchCustomerInput />
      </div>
      
      <div className="flex items-center gap-6 text-[var(--color-muted)] text-sm font-medium mr-4">
        <button className="flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors">
          <SlidersHorizontal size={18} />
          Sort by
        </button>
        <button className="flex items-center gap-2 hover:text-[var(--color-ink)] transition-colors">
          <Filter size={18} />
          Filters
        </button>
      </div>

      <AddCustomerButton />
    </header>
  );
}
