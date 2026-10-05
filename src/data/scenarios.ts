// src/data/scenarios.ts
import type { Service } from '../types/atlas';
import { initialServices } from './services';

const cloneServices = (): Service[] => JSON.parse(JSON.stringify(initialServices));

export const getScenarioState = (scenario: string): Service[] => {
  const services = cloneServices();

  switch (scenario) {
    case 'DATABASE_LATENCY':
      const dbLatency = services.find(s => s.id === 'database')!;
      dbLatency.status = 'CRITICAL';
      dbLatency.latency = 840;
      dbLatency.cpu = 85;

      const paymentLatency = services.find(s => s.id === 'payment-service')!;
      paymentLatency.status = 'DEGRADED';
      paymentLatency.latency = 620;
      paymentLatency.errorRate = 4.8;
      
      const orderLatency = services.find(s => s.id === 'order-service')!;
      orderLatency.status = 'DEGRADED';
      orderLatency.latency = 650;
      orderLatency.errorRate = 2.1;
      break;

    case 'PAYMENT_FAILURE':
      const paymentFail = services.find(s => s.id === 'payment-service')!;
      paymentFail.status = 'CRITICAL';
      paymentFail.latency = 1200;
      paymentFail.errorRate = 15.5;

      const orderFail = services.find(s => s.id === 'order-service')!;
      orderFail.status = 'CRITICAL';
      orderFail.latency = 1250;
      orderFail.errorRate = 12.0;
      break;

    case 'CPU_SATURATION':
      const urlCpu = services.find(s => s.id === 'url-service')!;
      urlCpu.status = 'CRITICAL';
      urlCpu.cpu = 98;
      urlCpu.latency = 550;
      urlCpu.errorRate = 5.2;
      
      const apiCpu = services.find(s => s.id === 'api-gateway')!;
      apiCpu.status = 'DEGRADED';
      apiCpu.latency = 390;
      break;

    case 'NORMAL':
    default:
      break;
  }

  return services;
};