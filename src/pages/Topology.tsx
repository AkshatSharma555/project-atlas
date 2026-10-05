// src/pages/Topology.tsx
import { ArrowDown, Server } from 'lucide-react';
import clsx from 'clsx';
import { useSimulation } from '../context/SimulationContext';
import type { Service } from '../types/atlas';

export const Topology = () => {
  const { services } = useSimulation();

  // Helper function to get service data by ID
  const getSvc = (id: string) => services.find(s => s.id === id) as Service;

  // Reusable Node Component graph ke liye
  const TopologyNode = ({ service }: { service: Service }) => {
    const statusColors = {
      HEALTHY: 'border-atlas-success text-atlas-success shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      DEGRADED: 'border-atlas-warning text-atlas-warning shadow-[0_0_15px_rgba(245,158,11,0.15)]',
      CRITICAL: 'border-atlas-danger text-atlas-danger shadow-[0_0_20px_rgba(239,68,68,0.2)]',
    };

    const bgColors = {
      HEALTHY: 'bg-atlas-success/10',
      DEGRADED: 'bg-atlas-warning/10',
      CRITICAL: 'bg-atlas-danger/10',
    };

    return (
      <div className={clsx("relative w-64 p-4 rounded-xl border-2 bg-atlas-panel flex flex-col items-center justify-center transition-all duration-500", statusColors[service.status])}>
        <div className={clsx("p-2 rounded-full mb-2", bgColors[service.status])}>
          <Server className="w-5 h-5" />
        </div>
        <div className="font-medium text-atlas-text">{service.name}</div>
        <div className="text-xs mt-1 opacity-80">{service.latency}ms | {service.status}</div>
      </div>
    );
  };

  return (
    <div className="text-atlas-text pb-10 flex flex-col items-center">
      <div className="w-full mb-10">
        <h2 className="text-2xl font-light mb-2">Service Topology</h2>
        <p className="text-atlas-muted text-sm">Real-time dependency map and failure propagation.</p>
      </div>

      {/* Graph Area */}
      <div className="flex flex-col items-center w-full max-w-4xl p-10 bg-atlas-dark/50 border border-atlas-border rounded-2xl relative">
        
        {/* Tier 1: API Gateway */}
        <TopologyNode service={getSvc('api-gateway')} />

        {/* Arrows pointing down from Gateway */}
        <div className="w-full max-w-md flex justify-between px-16 mt-2 mb-2 text-atlas-border">
          <ArrowDown className="w-6 h-6 animate-pulse" />
          <ArrowDown className="w-6 h-6 animate-pulse" />
        </div>

        {/* Tier 2: URL & Order Services */}
        <div className="w-full flex justify-center gap-20">
          <TopologyNode service={getSvc('url-service')} />
          <TopologyNode service={getSvc('order-service')} />
        </div>

        {/* Arrows pointing down to Payment & Database */}
        <div className="w-full flex justify-center gap-20 mt-2 mb-2 text-atlas-border">
          <div className="w-64 flex justify-center"><ArrowDown className="w-6 h-6 animate-pulse" /></div>
          <div className="w-64 flex justify-center"><ArrowDown className="w-6 h-6 animate-pulse" /></div>
        </div>

        {/* Tier 3: Payment (Under Order) */}
        <div className="w-full flex justify-end pr-[120px] lg:pr-[155px]">
           <TopologyNode service={getSvc('payment-service')} />
        </div>

        {/* Arrow from Payment to Database */}
        <div className="w-full flex justify-end pr-[220px] lg:pr-[255px] mt-2 mb-2 text-atlas-border">
           <ArrowDown className="w-6 h-6 animate-pulse" />
        </div>

        {/* Tier 4: Database */}
        <TopologyNode service={getSvc('database')} />

      </div>
    </div>
  );
};