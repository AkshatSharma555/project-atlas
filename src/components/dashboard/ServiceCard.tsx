// src/components/dashboard/ServiceCard.tsx
import { Server, Activity, Clock, AlertCircle } from 'lucide-react';
import clsx from 'clsx';
import type { Service } from '../../types/atlas';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  // Service ke status ke hisaab se dynamically colors change honge
  const statusColors = {
    HEALTHY: 'text-atlas-success bg-atlas-success/10 border-atlas-success/20',
    DEGRADED: 'text-atlas-warning bg-atlas-warning/10 border-atlas-warning/20',
    CRITICAL: 'text-atlas-danger bg-atlas-danger/10 border-atlas-danger/20',
  };

  return (
    <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5 hover:border-atlas-primary/50 transition-colors">
      
      {/* Top Section: Icon, Name aur Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/5 rounded-lg">
            <Server className="w-5 h-5 text-atlas-primary" />
          </div>
          <h3 className="text-lg font-medium text-atlas-text">{service.name}</h3>
        </div>
        <span className={clsx('px-2.5 py-1 rounded-full text-xs font-semibold border', statusColors[service.status])}>
          {service.status}
        </span>
      </div>

      {/* Bottom Section: Metrics (Latency, Error Rate, CPU) */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div>
          <div className="text-xs text-atlas-muted flex items-center gap-1.5 mb-1">
            <Clock className="w-3.5 h-3.5" /> Latency
          </div>
          <div className="text-sm font-medium text-atlas-text">{service.latency} ms</div>
        </div>
        <div>
          <div className="text-xs text-atlas-muted flex items-center gap-1.5 mb-1">
            <AlertCircle className="w-3.5 h-3.5" /> Error
          </div>
          <div className="text-sm font-medium text-atlas-text">{service.errorRate}%</div>
        </div>
        <div>
          <div className="text-xs text-atlas-muted flex items-center gap-1.5 mb-1">
            <Activity className="w-3.5 h-3.5" /> CPU
          </div>
          <div className="text-sm font-medium text-atlas-text">{service.cpu}%</div>
        </div>
      </div>
      
    </div>
  );
};