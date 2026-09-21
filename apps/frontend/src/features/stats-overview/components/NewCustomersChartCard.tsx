import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { useNewCustomersData } from '../hooks/useNewCustomersData';
import { ChartTooltip } from './ChartTooltip';

export function NewCustomersChartCard() {
  const { data } = useNewCustomersData();

  return (
    <div className="bg-white rounded-[24px] p-6 shadow-sm h-full flex flex-col">
      <h3 className="text-[var(--color-ink)] text-xl font-medium mb-6">New customers</h3>
      <div className="flex-1 min-h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lime)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-lime)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAds" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-light-blue)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-light-blue)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorReferral" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-primary-blue)" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="var(--color-primary-blue)" stopOpacity={0.3}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'var(--color-muted)' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'var(--color-muted)' }}
              tickCount={3}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: 'var(--color-ink)', strokeWidth: 1.5 }} />
            
            <Area type="monotone" dataKey="website" stackId="1" stroke="var(--color-lime)" fill="url(#colorWebsite)" />
            <Area type="monotone" dataKey="ads" stackId="1" stroke="var(--color-light-blue)" fill="url(#colorAds)" />
            <Area type="monotone" dataKey="referral" stackId="1" stroke="var(--color-primary-blue)" fill="url(#colorReferral)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
