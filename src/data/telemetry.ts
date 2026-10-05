// src/data/telemetry.ts
import type { ScenarioType } from '../types/atlas';

// Yeh function last 20 minutes ka data generate karega charts ke liye
export const generateMetricsData = (scenario: ScenarioType) => {
  const data = [];
  const now = new Date();
  
  // Hum picchle 20 minute ka data loop karke banayenge
  for (let i = 20; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60000); 
    const timeStr = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Base Healthy Data
    let dbLatency = 80 + Math.random() * 20; 
    let paymentLatency = 200 + Math.random() * 30;
    let cpu = 40 + Math.random() * 10;

    // Agar incident hai, toh last ke 5 minutes (i <= 5) me chart ekdum spike karega
    if (i <= 5) {
      if (scenario === 'DATABASE_LATENCY') {
        dbLatency = 840 + Math.random() * 50;
        paymentLatency = 620 + Math.random() * 40;
      } else if (scenario === 'PAYMENT_FAILURE') {
        paymentLatency = 1200 + Math.random() * 100;
      } else if (scenario === 'CPU_SATURATION') {
        cpu = 95 + Math.random() * 4;
      }
    }

    data.push({
      time: timeStr,
      'DB Latency': Math.round(dbLatency),
      'Payment Latency': Math.round(paymentLatency),
      'CPU Usage': Math.round(cpu)
    });
  }
  
  return data;
};