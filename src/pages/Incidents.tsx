// src/pages/Incidents.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';
import clsx from 'clsx';

export const Incidents = () => {
  const { activeScenario, activeIncident, isAnalyzing, runAnalysis } = useSimulation();
  const navigate = useNavigate();
  
  const [progressStep, setProgressStep] = useState(0);

  const steps = [
    "Collecting telemetry...",
    "Normalizing signals...",
    "Correlating evidence...",
    "Detecting anomalies...",
    "Ranking root causes...",
    "Building evidence bundle...",
    "Generating recommendation..."
  ];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isAnalyzing) {
      setProgressStep(0);
      interval = setInterval(() => {
        setProgressStep(prev => (prev < steps.length ? prev + 1 : prev));
      }, 400); 
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]); // <-- Error yahan tha, ab theek ho gaya hai

  if (activeScenario === 'NORMAL') {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-atlas-muted">
        <div className="p-6 bg-atlas-success/10 rounded-full mb-6">
          <CheckCircle2 className="w-16 h-16 text-atlas-success" />
        </div>
        <h2 className="text-2xl font-light text-atlas-text">No Active Incidents</h2>
        <p className="text-sm mt-2">The testbed environment is operating optimally.</p>
      </div>
    );
  }

  return (
    <div className="text-atlas-text pb-10 max-w-4xl mx-auto mt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2">Incident Management</h2>
        <p className="text-atlas-muted text-sm">Detect, analyze, and resolve operational anomalies.</p>
      </div>

      <div className="bg-atlas-panel border border-atlas-danger/50 rounded-xl p-8 relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-atlas-danger/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-atlas-danger/10 rounded-xl text-atlas-danger">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-medium text-white">Anomaly Detected</h3>
              <p className="text-sm text-atlas-danger mt-1">System behavior deviated significantly from baseline.</p>
            </div>
          </div>
          <span className="px-4 py-1.5 bg-atlas-danger/20 border border-atlas-danger/30 text-atlas-danger text-xs font-bold tracking-widest rounded-full">
            HIGH SEVERITY
          </span>
        </div>

        {!isAnalyzing && !activeIncident && (
          <div className="mt-10 flex justify-center relative z-10">
            <button 
              onClick={runAnalysis}
              className="group relative px-8 py-4 bg-atlas-primary hover:bg-blue-600 text-white font-medium rounded-lg transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] flex items-center gap-3"
            >
              <span className="tracking-widest">RUN INCIDENT ANALYSIS</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {isAnalyzing && (
          <div className="mt-8 bg-black/30 border border-atlas-border p-6 rounded-lg font-mono text-sm space-y-4 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={clsx("flex items-center gap-3 transition-all duration-300", index <= progressStep ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")}>
                {index < progressStep ? (
                  <CheckCircle2 className="w-4 h-4 text-atlas-success" />
                ) : (
                  <Loader2 className="w-4 h-4 text-atlas-primary animate-spin" />
                )}
                <span className={index < progressStep ? "text-atlas-text" : "text-atlas-muted"}>{step}</span>
              </div>
            ))}
          </div>
        )}

        {activeIncident && !isAnalyzing && (
          <div className="mt-8 border-t border-atlas-border pt-8 relative z-10 animate-fade-in">
            <div className="bg-atlas-success/10 border border-atlas-success/30 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-atlas-success/20 p-2 rounded-full">
                   <CheckCircle2 className="w-6 h-6 text-atlas-success" />
                </div>
                <div>
                  <div className="font-medium text-atlas-success text-lg">Analysis Complete</div>
                  <div className="text-sm text-atlas-muted mt-1">
                    Probable root cause identified with <span className="text-atlas-text font-bold">{activeIncident.rca?.confidence}%</span> confidence.
                  </div>
                </div>
              </div>
              <button 
                onClick={() => navigate('/decision')}
                className="px-6 py-3 bg-atlas-success text-black font-bold rounded-lg hover:bg-emerald-400 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                VIEW DECISION <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};