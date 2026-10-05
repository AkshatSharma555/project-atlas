// src/context/SimulationContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Service, ScenarioType, Incident } from '../types/atlas';
import { getScenarioState } from '../data/scenarios';
import { runRCAEngine } from '../engine/rcaEngine';

interface SimulationContextType {
  activeScenario: ScenarioType;
  services: Service[];
  activeIncident: Incident | null;
  isAnalyzing: boolean;
  injectFault: (scenario: ScenarioType) => void;
  resetEnvironment: () => void;
  runAnalysis: () => Promise<void>;
  updateIncidentStatus: (status: 'DECISION_ACCEPTED' | 'DECISION_REJECTED') => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('NORMAL');
  const [services, setServices] = useState<Service[]>(getScenarioState('NORMAL'));
  
  // Nayi states humare incidents aur analysis loading ke liye
  const [activeIncident, setActiveIncident] = useState<Incident | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    setServices(getScenarioState(activeScenario));
    // Agar normal state hai, toh incident clear kar do
    if (activeScenario === 'NORMAL') {
      setActiveIncident(null);
    }
  }, [activeScenario]);

  const injectFault = (scenario: ScenarioType) => {
    setActiveScenario(scenario);
    setActiveIncident(null); // Naya fault aate hi purana analysis reset
  };

  const resetEnvironment = () => {
    setActiveScenario('NORMAL');
    setActiveIncident(null);
  };

  // Yeh function UI me "Run Analysis" button dabane par call hoga
  const runAnalysis = async () => {
    setIsAnalyzing(true);
    
    // UI me ek premium feel (animation) dene ke liye hum thoda delay add kar rahe hain
    // Par actual data humare engine se hi aayega
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const result = runRCAEngine(activeScenario);
        setActiveIncident(result);
        setIsAnalyzing(false);
        resolve();
      }, 3000); // 3 seconds ka premium loading time
    });
  };

  // Human review save karne ke liye
  const updateIncidentStatus = (status: 'DECISION_ACCEPTED' | 'DECISION_REJECTED') => {
    if (activeIncident) {
      setActiveIncident({ ...activeIncident, status });
    }
  };

  return (
    <SimulationContext.Provider value={{ 
      activeScenario, 
      services, 
      activeIncident, 
      isAnalyzing,
      injectFault, 
      resetEnvironment,
      runAnalysis,
      updateIncidentStatus
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (context === undefined) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};