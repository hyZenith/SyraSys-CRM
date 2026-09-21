import { Search } from 'lucide-react';

export function SearchCustomerInput() {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search size={20} className="text-[var(--color-muted)]" />
      </div>
      <input
        type="text"
        placeholder="Search customer"
        className="w-full bg-white rounded-full py-2.5 pl-11 pr-4 text-[var(--color-ink)] placeholder-[var(--color-muted)] outline-none focus:ring-2 focus:ring-[var(--color-primary-blue)] transition-shadow border border-transparent shadow-sm"
      />
    </div>
  );
}
