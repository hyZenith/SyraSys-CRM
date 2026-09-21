import { Plus } from 'lucide-react';

export function AddCustomerButton() {
  return (
    <button className="flex items-center gap-2 bg-[var(--color-ink)] text-white px-5 py-2.5 rounded-full font-semibold transition-transform active:scale-95 hover:bg-black shadow-sm">
      <Plus size={20} strokeWidth={2.5} />
      Add customer
    </button>
  );
}
