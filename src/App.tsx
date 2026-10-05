// src/App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Overview } from './pages/Overview';
import { Topology } from './pages/Topology';
import { Telemetry } from './pages/Telemetry';
import { Incidents } from './pages/Incidents';
import { DecisionCenter } from './pages/DecisionCenter';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout ke andar saare dashboard pages aayenge */}
        <Route path="/" element={<MainLayout />}>
          {/* Default route ko overview pe bhej rahe hain */}
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />

          {/* Baaki pages hum baad me banayenge, abhi ke liye placeholders */}
          <Route path="telemetry" element={<Telemetry />} />
          <Route path="topology" element={<Topology />} />
          <Route path="incidents" element={<Incidents />} />
          <Route path="decision" element={<DecisionCenter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}