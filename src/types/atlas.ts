// src/types/atlas.ts

export type ServiceStatus = 'HEALTHY' | 'DEGRADED' | 'CRITICAL';
export type Severity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface Service {
  id: string;
  name: string;
  status: ServiceStatus;
  latency: number; 
  errorRate: number; 
  cpu: number; 
  dependencies: string[]; 
}

export interface Metric {
  id: string;
  timestamp: string;
  serviceId: string;
  name: string; 
  value: number;
}

export interface Log {
  id: string;
  timestamp: string;
  serviceId: string;
  level: Severity;
  message: string;
  metadata?: Record<string, any>;
}

export interface Anomaly {
  id: string;
  serviceId: string;
  metric: string;
  baseline: number;
  current: number;
  deviationPercentage: number;
}

export interface RCAOutput {
  rootCauseServiceId: string;
  causeName: string;
  confidence: number; 
  evidence: string[];
  recommendation: string;
}

export interface Incident {
  id: string;
  title: string;
  status: 'INVESTIGATING' | 'RESOLVED' | 'DECISION_ACCEPTED' | 'DECISION_REJECTED';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  affectedServices: string[];
  startTime: string;
  rca?: RCAOutput;
}

export type ScenarioType = 
  | 'NORMAL' 
  | 'DATABASE_LATENCY' 
  | 'PAYMENT_FAILURE' 
  | 'CPU_SATURATION';