interface KpiTileProps {
  label: string;
  value: string | number;
  trend: string;
}

export function KpiTile({ label, value, trend }: KpiTileProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm border border-transparent flex flex-col justify-between h-full">
      <h3 className="text-[var(--color-ink)] text-lg font-medium mb-4">{label}</h3>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-4xl font-bold text-[var(--color-ink)]">{value}</span>
        <span className="bg-[var(--color-lime)] text-black px-2.5 py-1 rounded-full text-sm font-bold">
          {trend}
        </span>
      </div>
    </div>
  );
}
