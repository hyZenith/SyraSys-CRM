import { useNavigate } from 'react-router-dom';
import { PipelineBoard } from '../../features/pipeline-board';

export function LeadsPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full pt-8 pl-8">
      <div className="flex items-center justify-between mb-8 pr-8">
        <h1 className="text-3xl font-bold">Leads Pipeline</h1>
        <button 
          onClick={() => navigate('/leads/create')}
          className="bg-[var(--color-ink)] text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Create Lead
        </button>
      </div>
      
      <PipelineBoard />
    </div>
  );
}
