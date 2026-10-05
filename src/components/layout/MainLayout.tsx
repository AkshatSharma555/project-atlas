// src/components/layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-atlas-dark flex">
      {/* Fixed Sidebar */}
      <Sidebar />
      
      {/* Main Content Area - ml-64 (margin-left) taaki sidebar ke upar overlap na ho */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Topbar />
        
        {/* Outlet woh jagah hai jahan React Router automatically pages render karega */}
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};