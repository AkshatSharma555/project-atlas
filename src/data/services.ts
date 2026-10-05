// src/data/services.ts
import type { Service } from '../types/atlas';

export const initialServices: Service[] = [
  {
    id: 'api-gateway',
    name: 'API Gateway',
    status: 'HEALTHY',
    latency: 120,
    errorRate: 0.1,
    cpu: 45,
    dependencies: ['url-service', 'order-service']
  },
  {
    id: 'url-service',
    name: 'URL Service',
    status: 'HEALTHY',
    latency: 145,
    errorRate: 0.3,
    cpu: 52,
    dependencies: ['database']
  },
  {
    id: 'order-service',
    name: 'Order Service',
    status: 'HEALTHY',
    latency: 180,
    errorRate: 0.4,
    cpu: 38,
    dependencies: ['payment-service']
  },
  {
    id: 'payment-service',
    name: 'Payment Service',
    status: 'HEALTHY',
    latency: 210,
    errorRate: 0.2,
    cpu: 41,
    dependencies: ['database']
  },
  {
    id: 'database',
    name: 'PostgreSQL Database',
    status: 'HEALTHY',
    latency: 85,
    errorRate: 0.0,
    cpu: 30,
    dependencies: []
  }
];