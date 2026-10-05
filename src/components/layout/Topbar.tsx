// src/components/layout/Topbar.tsx
import { Search, Bell } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const Topbar = () => {
  // Context se active scenario nikal rahe hain status dikhane ke liye
  const { activeScenario } = useSimulation();

  return (
    <div className="h-16 bg-atlas-dark border-b border-atlas-border flex items-center justify-between px-6 sticky top-0 z-10">
      
      {/* Search Bar */}
      <div className="flex items-center gap-4 text-atlas-muted w-1/3">
        <Search className="w-4 h-4" />
        <input 
          type="text" 
          placeholder="Search telemetry, services, incidents..." 
          className="bg-transparent border-none outline-none text-sm w-full placeholder:text-atlas-muted/70 text-atlas-text focus:ring-0"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-atlas-muted">System Status:</span>
          {activeScenario === 'NORMAL' ? (
            <span className="text-atlas-success font-medium flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-atlas-success animate-pulse"></span>
               Healthy
            </span>
          ) : (
            <span className="text-atlas-danger font-medium flex items-center gap-1.5">
               <span className="w-2 h-2 rounded-full bg-atlas-danger animate-pulse"></span>
               Incident Active
            </span>
          )}
        </div>
        
        <div className="w-px h-6 bg-atlas-border"></div>

        <button className="text-atlas-muted hover:text-atlas-text transition-colors">
          <Bell className="w-4 h-4" />
        </button>
        
        {/* Profile Avatar (AK for Akshat) */}
        <div className="w-8 h-8 rounded-full bg-atlas-panel border border-atlas-border flex items-center justify-center text-xs text-atlas-primary font-medium">
          AK
        </div>
      </div>
    </div>
  );
};