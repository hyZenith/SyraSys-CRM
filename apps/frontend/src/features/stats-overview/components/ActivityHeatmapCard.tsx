import { useMemo } from 'react';

export function ActivityHeatmapCard() {
  const hours = ['2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'];
  const days = Array.from({ length: 13 }, (_, i) => i + 1);

  // Generate deterministic but random-looking data for the grid
  const grid = useMemo(() => {
    const colors = [
      'bg-transparent', // 0 intensity
      'bg-[var(--color-light-blue)]', // low intensity
      'bg-[var(--color-primary-blue)] opacity-80', // med
      'bg-[var(--color-primary-blue)]', // high
      'bg-[var(--color-lime)]', // peak
    ];
    
    return hours.map((_, i) => 
      days.map((_, j) => {
        // Pseudo-random based on indices to keep it stable
        const val = (i * 7 + j * 13) % 10;
        let colorIndex = 0;
        if (val > 8) colorIndex = 4;
        else if (val > 6) colorIndex = 3;
        else if (val > 4) colorIndex = 2;
        else if (val > 2) colorIndex = 1;
        return colors[colorIndex];
      })
    );
  }, [hours, days]);

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[var(--color-ink)] text-xl font-medium mb-6">Activity</h3>
      <div className="flex-1 flex flex-col">
        <div className="flex gap-2 flex-1">
          {/* Y Axis */}
          <div className="flex flex-col justify-between text-xs text-[var(--color-muted)] font-medium pr-2 pb-6">
            {hours.map(hour => <div key={hour} className="h-4 flex items-center">{hour}</div>)}
          </div>
          
          {/* Grid Area */}
          <div className="flex-1 flex flex-col justify-between pb-6">
            {grid.map((row, i) => (
              <div key={i} className="flex justify-between h-4">
                {row.map((colorClass, j) => (
                  <div key={j} className={`w-4 h-4 rounded-sm ${colorClass}`} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* X Axis */}
        <div className="flex pl-10">
          <span className="text-xs text-[var(--color-muted)] font-medium mr-4">June</span>
          <div className="flex-1 flex justify-between text-xs text-[var(--color-muted)] font-medium">
            {days.map(day => <span key={day}>{day}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
