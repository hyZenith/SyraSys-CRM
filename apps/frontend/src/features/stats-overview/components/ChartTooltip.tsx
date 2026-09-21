export function ChartTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[var(--color-ink)] text-white px-3 py-2 rounded-xl text-sm shadow-lg border border-gray-700/50">
        <div className="flex flex-col gap-1.5">
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center gap-2">
              <div 
                className="w-2 h-2 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="capitalize">{entry.name} – {entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}
