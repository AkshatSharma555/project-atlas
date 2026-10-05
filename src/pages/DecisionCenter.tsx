// src/pages/DecisionCenter.tsx
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ShieldAlert, CheckCircle2, XCircle, ChevronRight, FileText, Activity } from 'lucide-react';
import { useSimulation } from '../context/SimulationContext';

export const DecisionCenter = () => {
  const { activeIncident, updateIncidentStatus } = useSimulation();
  const navigate = useNavigate();

  // Agar koi incident analyze nahi hua hai toh placeholder dikhao
  if (!activeIncident || !activeIncident.rca) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center text-atlas-muted">
        <div className="p-6 bg-white/5 rounded-full mb-6">
          <BrainCircuit className="w-16 h-16 text-atlas-muted/50" />
        </div>
        <h2 className="text-2xl font-light text-atlas-text">Decision Center Idle</h2>
        <p className="text-sm mt-2">Run an incident analysis to generate AI-driven decisions.</p>
        <button 
          onClick={() => navigate('/incidents')} 
          className="mt-6 px-6 py-2 bg-atlas-primary/20 hover:bg-atlas-primary/30 border border-atlas-primary/30 text-atlas-primary rounded-lg text-sm transition-all"
        >
          Go to Incidents
        </button>
      </div>
    );
  }

  const { rca } = activeIncident;
  const isResolved = activeIncident.status === 'DECISION_ACCEPTED' || activeIncident.status === 'DECISION_REJECTED';

  return (
    <div className="text-atlas-text pb-10 max-w-6xl mx-auto mt-6">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-2 flex items-center gap-3">
          <BrainCircuit className="w-6 h-6 text-atlas-primary" />
          Decision Intelligence Center
        </h2>
        <p className="text-atlas-muted text-sm">Review AI-generated root cause analysis and operational recommendations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Evidence & Root Cause (Takes up 2 columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Root Cause Card */}
          <div className="bg-atlas-panel border border-atlas-border rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6 border-b border-atlas-border pb-4">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-atlas-warning" />
                Identified Root Cause
              </h3>
              <div className="flex items-center gap-2 bg-atlas-success/10 px-3 py-1.5 rounded-full border border-atlas-success/20">
                <span className="text-xs text-atlas-muted">AI Confidence:</span>
                <span className="text-sm font-bold text-atlas-success">{rca.confidence}%</span>
              </div>
            </div>
            
            <div className="mb-2 text-sm text-atlas-muted">
              Source Origin: <span className="text-atlas-primary font-mono bg-atlas-primary/10 border border-atlas-primary/20 px-2 py-0.5 rounded ml-1">{rca.rootCauseServiceId}</span>
            </div>
            <div className="text-xl font-medium text-white mb-2">{rca.causeName}</div>
          </div>

          {/* Evidence Bundle */}
          <div className="bg-atlas-panel border border-atlas-border rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-medium flex items-center gap-2 mb-6 border-b border-atlas-border pb-4">
              <FileText className="w-5 h-5 text-atlas-primary" />
              Correlated Evidence Bundle
            </h3>
            <div className="space-y-4">
              {rca.evidence.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-black/20 p-4 rounded-lg border border-atlas-border/50 hover:border-atlas-primary/30 transition-colors">
                  <ChevronRight className="w-5 h-5 text-atlas-primary mt-0 flex-shrink-0" />
                  <span className="text-sm text-atlas-muted leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Recommendation & Actions */}
        <div className="space-y-6">
          <div className="bg-atlas-primary/5 border border-atlas-primary/20 rounded-xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.05)]">
            <div className="absolute top-0 right-0 w-40 h-40 bg-atlas-primary/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
            
            <h3 className="text-lg font-medium flex items-center gap-2 mb-4 text-atlas-primary">
              <Activity className="w-5 h-5" />
              Recommended Action
            </h3>
            <p className="text-sm text-atlas-text leading-relaxed bg-black/40 p-5 rounded-lg border border-atlas-primary/10">
              {rca.recommendation}
            </p>

            {/* Human in the loop workflow */}
            {!isResolved ? (
              <div className="mt-8 space-y-3 relative z-10">
                <div className="text-xs text-atlas-muted uppercase tracking-widest mb-3 font-semibold flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-atlas-warning animate-pulse"></div>
                  Human Review Required
                </div>
                <button 
                  onClick={() => updateIncidentStatus('DECISION_ACCEPTED')}
                  className="w-full py-3 bg-atlas-success/10 hover:bg-atlas-success text-atlas-success hover:text-black border border-atlas-success/50 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" /> ACCEPT DECISION
                </button>
                <button 
                  onClick={() => updateIncidentStatus('DECISION_REJECTED')}
                  className="w-full py-3 bg-transparent hover:bg-atlas-danger/10 text-atlas-danger border border-atlas-border hover:border-atlas-danger/50 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  <XCircle className="w-5 h-5" /> REJECT DECISION
                </button>
              </div>
            ) : (
              <div className="mt-8 p-5 bg-black/40 border border-atlas-border rounded-lg text-center relative z-10">
                {activeIncident.status === 'DECISION_ACCEPTED' ? (
                  <div className="text-atlas-success font-medium flex items-center justify-center gap-2 text-lg">
                    <CheckCircle2 className="w-6 h-6" /> Action Approved
                  </div>
                ) : (
                  <div className="text-atlas-danger font-medium flex items-center justify-center gap-2 text-lg">
                    <XCircle className="w-6 h-6" /> Action Rejected
                  </div>
                )}
                <div className="text-xs text-atlas-muted mt-3">Status logged in audit trail.</div>
              </div>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};