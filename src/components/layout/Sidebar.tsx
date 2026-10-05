// src/components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Activity, 
  AlertTriangle, 
  BrainCircuit, 
  Network 
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { name: 'Overview', path: '/overview', icon: LayoutDashboard },
  { name: 'Telemetry', path: '/telemetry', icon: Activity },
  { name: 'Service Topology', path: '/topology', icon: Network },
  { name: 'Incidents', path: '/incidents', icon: AlertTriangle },
  { name: 'Decision Center', path: '/decision', icon: BrainCircuit },
];

export const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-atlas-panel border-r border-atlas-border flex flex-col fixed left-0 top-0">
      
      {/* Logo Area */}
      <div className="p-6">
        <h1 className="text-2xl font-light tracking-widest text-atlas-primary flex items-center gap-2">
          <BrainCircuit className="w-8 h-8" />
          ATLAS
        </h1>
        <p className="text-xs text-atlas-muted mt-2 tracking-wider">
          DECISION INTELLIGENCE
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200',
                isActive 
                  ? 'bg-atlas-primary/10 text-atlas-primary border border-atlas-primary/20' 
                  : 'text-atlas-muted hover:text-atlas-text hover:bg-white/5'
              )
            }
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Status Area (Controlled Testbed) */}
      <div className="p-4 m-4 border border-atlas-border bg-black/20 rounded-lg">
        <div className="text-xs text-atlas-muted mb-1">Environment</div>
        <div className="text-sm font-medium text-atlas-text flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-atlas-success animate-pulse"></div>
          ATLAS-TESTBED
        </div>
        <div className="mt-3 pt-3 border-t border-atlas-border/50 text-[10px] text-atlas-warning tracking-wider">
          CONTROLLED SIMULATION
        </div>
      </div>

    </div>
  );
};