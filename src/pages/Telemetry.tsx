// src/pages/Telemetry.tsx
import { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Activity, Terminal } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import { generateMetricsData } from '../data/telemetry';

export const Telemetry = () => {
  const { activeScenario } = useSimulation();

  // useMemo taaki har choti cheez par data re-calculate na ho
  const chartData = useMemo(() => generateMetricsData(activeScenario), [activeScenario]);

  // Custom Tooltip for Recharts (Premium Dark Theme)
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-atlas-panel border border-atlas-border p-3 rounded-lg shadow-xl">
          <p className="text-atlas-muted text-xs mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm font-medium">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-atlas-text">{entry.name}:</span>
              <span style={{ color: entry.color }}>{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Fake logs based on scenario
  const getLogs = () => {
    if (activeScenario === 'DATABASE_LATENCY') {
      return [
        "[10:31:02] WARN [database] Query execution exceeded 800ms limit. latency=842ms",
        "[10:31:04] ERROR [payment-service] Upstream database timeout. request_id=req_83921",
        "[10:31:07] WARN [order-service] Payment dependency degraded. Retrying...",
      ];
    }
    if (activeScenario === 'PAYMENT_FAILURE') {
      return [
        "[10:31:05] CRITICAL [payment-service] Connection refused to payment gateway.",
        "[10:31:06] ERROR [order-service] Failed to process order payment. status=503",
      ];
    }
    return [
      "[10:31:00] INFO [api-gateway] Request routed successfully. ms=120",
      "[10:31:02] INFO [url-service] URL resolved. code=200",
      "[10:31:05] INFO [database] Health check OK.",
    ];
  };

  return (
    <div className="text-atlas-text pb-10 space-y-8">
      <div>
        <h2 className="text-2xl font-light mb-2">Telemetry Explorer</h2>
        <p className="text-atlas-muted text-sm">Real-time metrics, traces, and operational logs.</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Latency Chart */}
        <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-atlas-muted mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-atlas-primary" /> Latency Over Time (ms)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="DB Latency" stroke="#ef4444" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="Payment Latency" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CPU Chart */}
        <div className="bg-atlas-panel border border-atlas-border rounded-xl p-5">
          <h3 className="text-sm font-medium text-atlas-muted mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-atlas-primary" /> System CPU Usage (%)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="cpuGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis dataKey="time" stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#a3a3a3" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="CPU Usage" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#cpuGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Logs Terminal Section */}
      <div className="bg-atlas-dark border border-atlas-border rounded-xl overflow-hidden font-mono text-sm">
        <div className="bg-atlas-panel border-b border-atlas-border px-4 py-2 flex items-center gap-2 text-atlas-muted text-xs">
          <Terminal className="w-4 h-4" /> Structured Logs
        </div>
        <div className="p-4 space-y-2">
          {getLogs().map((log, i) => (
            <div key={i} className={
              log.includes('CRITICAL') || log.includes('ERROR') ? 'text-atlas-danger' : 
              log.includes('WARN') ? 'text-atlas-warning' : 'text-atlas-muted'
            }>
              {log}
            </div>
          ))}
          <div className="text-atlas-muted/50 animate-pulse mt-4">_ Waiting for new logs...</div>
        </div>
      </div>
    </div>
  );
};