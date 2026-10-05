// src/engine/rcaEngine.ts
import type { Incident, ScenarioType } from '../types/atlas';

// Yeh function humara deterministic AI/RCA engine simulate karega
export const runRCAEngine = (scenario: ScenarioType): Incident | null => {
  if (scenario === 'NORMAL') return null;

  // Har naye incident ke liye ek base object
  const baseIncident = {
    id: `INC-${Math.floor(Math.random() * 900) + 100}`,
    startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    status: 'INVESTIGATING' as const,
  };

  switch (scenario) {
    case 'DATABASE_LATENCY':
      return {
        ...baseIncident,
        title: 'Database Degradation & Downstream Timeout',
        severity: 'HIGH',
        affectedServices: ['database', 'payment-service', 'order-service'],
        rca: {
          rootCauseServiceId: 'database',
          causeName: 'Database Latency Spike',
          confidence: 87,
          evidence: [
            'Database latency increased 6.2x baseline (to 840ms).',
            'Payment Service latency increased shortly afterward.',
            '37 payment timeout events detected in structured logs.',
            'Topology Analysis: Payment Service depends on Database.',
            'Temporal ordering supports dependency propagation.'
          ],
          recommendation: 'Investigate database connection saturation and slow queries. Temporarily scale read replicas before modifying downstream services.'
        }
      };

    case 'PAYMENT_FAILURE':
      return {
        ...baseIncident,
        title: 'Payment Gateway Connection Refused',
        severity: 'HIGH',
        affectedServices: ['payment-service', 'order-service'],
        rca: {
          rootCauseServiceId: 'payment-service',
          causeName: 'External Gateway Timeout',
          confidence: 94,
          evidence: [
            'Payment service error rate spiked to 15.5%.',
            'Database metrics remain healthy (no internal DB bottleneck).',
            'Order service downstream failures correlate 1:1 with payment drops.'
          ],
          recommendation: 'Check external payment provider API status. Implement circuit breaker on Order Service to prevent cascading resource exhaustion.'
        }
      };

    case 'CPU_SATURATION':
      return {
        ...baseIncident,
        title: 'URL Service CPU Saturation',
        severity: 'MEDIUM',
        affectedServices: ['url-service', 'api-gateway'],
        rca: {
          rootCauseServiceId: 'url-service',
          causeName: 'Compute Resource Exhaustion',
          confidence: 78,
          evidence: [
            'URL Service CPU utilization reached 98%.',
            'API Gateway reporting degraded upstream response times.',
            'No database anomalies detected.'
          ],
          recommendation: 'Enable horizontal pod autoscaling for URL Service. Check recent deployments for potential memory leaks or unoptimized regex.'
        }
      };

    default:
      return null;
  }
};