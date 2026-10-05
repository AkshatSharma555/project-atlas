// src/pages/Overview.tsx
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { useSimulation } from '../context/SimulationContext';
import { ServiceCard } from '../components/dashboard/ServiceCard';

export const Overview = () => {
  // Context se hum backend engine ka data aur control functions le rahe hain
  const { services, activeScenario, injectFault, resetEnvironment } = useSimulation();

  // Top level stats calculate kar rahe hain dynamically
  const totalServices = services.length;
  const degradedOrCritical = services.filter(s => s.status !== 'HEALTHY').length;
  const systemHealth = degradedOrCritical === 0 ? '100%' : `${Math.round(((totalServices - degradedOrCritical) / totalServices) * 100)}%`;

  return (
    <div className="space-y-8 text-atlas-text pb-10">
      
      {/* Header Section */}
      <div>
        <h2 className="text-2xl font-light mb-2">Atlas Command Center</h2>
        <p className="text-atlas-muted text-sm">
          Evidence-driven operational intelligence for distributed systems.
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-atlas-success/10 rounded-lg text-atlas-success">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-atlas-muted mb-1">System Health</div>
            <div className="text-2xl font-medium">{systemHealth}</div>
          </div>
        </div>

        <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-atlas-primary/10 rounded-lg text-atlas-primary">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-atlas-muted mb-1">Active Services</div>
            <div className="text-2xl font-medium">0{totalServices}</div>
          </div>
        </div>

        <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5 flex items-center gap-4">
          <div className={clsx("p-3 rounded-lg", activeScenario !== 'NORMAL' ? "bg-atlas-danger/10 text-atlas-danger" : "bg-white/5 text-atlas-muted")}>
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm text-atlas-muted mb-1">Active Incidents</div>
            <div className="text-2xl font-medium">{activeScenario !== 'NORMAL' ? '01' : '00'}</div>
          </div>
        </div>
      </div>

      {/* Fault Injection Simulator Panel */}
      <div className="bg-atlas-panel border border-atlas-border rounded-xl p-6 relative overflow-hidden">
        {/* Subtle background glow for premium feel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-atlas-warning/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        
        <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-atlas-warning" />
          Controlled Fault Injection
        </h3>
        <p className="text-sm text-atlas-muted mb-5">
          Select a scenario to simulate heterogeneous operational evidence across the testbed.
        </p>
        
        <div className="flex flex-wrap gap-4 relative z-10">
          <button 
            onClick={() => injectFault('DATABASE_LATENCY')}
            className={clsx("px-4 py-2 border rounded-lg text-sm transition-all", activeScenario === 'DATABASE_LATENCY' ? "bg-atlas-warning/20 border-atlas-warning text-atlas-warning" : "bg-atlas-dark border-atlas-border hover:border-atlas-warning hover:text-atlas-warning")}
          >
            Inject Database Latency
          </button>
          <button 
            onClick={() => injectFault('PAYMENT_FAILURE')}
            className={clsx("px-4 py-2 border rounded-lg text-sm transition-all", activeScenario === 'PAYMENT_FAILURE' ? "bg-atlas-danger/20 border-atlas-danger text-atlas-danger" : "bg-atlas-dark border-atlas-border hover:border-atlas-danger hover:text-atlas-danger")}
          >
            Inject Payment Failure
          </button>
          <button 
            onClick={() => injectFault('CPU_SATURATION')}
            className={clsx("px-4 py-2 border rounded-lg text-sm transition-all", activeScenario === 'CPU_SATURATION' ? "bg-atlas-warning/20 border-atlas-warning text-atlas-warning" : "bg-atlas-dark border-atlas-border hover:border-atlas-warning hover:text-atlas-warning")}
          >
            Inject CPU Saturation
          </button>
          
          <button 
            onClick={resetEnvironment}
            className="px-4 py-2 bg-atlas-primary/20 text-atlas-primary border border-atlas-primary/50 rounded-lg text-sm hover:bg-atlas-primary hover:text-white transition-all ml-auto"
          >
            Reset Environment
          </button>
        </div>
      </div>

      {/* Service Grid - Data se map ho raha hai */}
      <div>
        <h3 className="text-lg font-medium mb-4">Service Health</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>

    </div>
  );
};