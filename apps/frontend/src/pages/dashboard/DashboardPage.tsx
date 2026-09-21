import { NewCustomersChartCard, ActivityHeatmapCard, KpiTile } from '../../features/stats-overview';
import { PipelineBoard } from '../../features/pipeline-board';

export function DashboardPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      {/* Stats Row */}
      <div className="grid grid-cols-12 gap-6 min-h-[300px]">
        {/* New Customers Chart (Widest ~ 40%) */}
        <div className="col-span-5">
          <NewCustomersChartCard />
        </div>
        
        {/* Activity Heatmap (Middle ~ 35%) */}
        <div className="col-span-4">
          <ActivityHeatmapCard />
        </div>
        
        {/* KPI Tiles (Narrowest ~ 25%) */}
        <div className="col-span-3 flex flex-col gap-6">
          <div className="flex-1">
            <KpiTile 
              label="Tasks in progress"
              value="76"
              trend="+6%"
            />
          </div>
          <div className="flex-1">
            <KpiTile 
              label="Prepayments"
              value="$12,076"
              trend="+12%"
            />
          </div>
        </div>
      </div>

      {/* Pipeline Board */}
      <div className="flex-1 pb-4">
        <PipelineBoard />
      </div>
    </div>
  );
}
