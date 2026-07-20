export function PriorityDealCard() {
  return (
    <div className="bg-[var(--color-ink)] rounded-2xl p-5 text-white shadow-sm">
      <h3 className="font-semibold text-lg mb-2">Priority deal</h3>
      <p className="text-[#B3B3B3] text-sm leading-relaxed mb-4">
        The lead is already in the pipeline. Assign a manager and continue.
      </p>
      <button className="w-full bg-white text-[var(--color-ink)] font-semibold rounded-full py-2.5 transition-transform active:scale-95 hover:bg-[var(--color-cream)]">
        Assign
      </button>
    </div>
  );
}
