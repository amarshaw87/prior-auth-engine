import React from 'react';
import { AuthAutomationProvider, useAuthAutomation } from './context/AuthContext';
import useFaxFetch from './hooks/useFaxFetch'; 
import ExcelForm from './components/ExcelForm';
import AuthForm from './components/AuthForm';
import FaxPreview from './components/FaxPreview';
import './index.css';

function Workspace() {
  const { clearWorkspace, activeAuthData } = useAuthAutomation();
  const { processAndFetch, loading, error } = useFaxFetch();

  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 py-10 px-4 font-sans selection:bg-indigo-500 selection:text-white">
      {/* Bulletproof Inline Shimmer Animation */}
      <style>{`
        @keyframes shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .traveling-light-text {
          background: linear-gradient(90deg, #94a3b8 0%, #ffffff 50%, #818cf8 70%, #94a3b8 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 4s linear infinite;
        }
      `}</style>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-mono font-medium tracking-wide shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
            ENTERPRISE RCM PIPELINE v1.0
          </div>

          {/* Heading with continuous light travel */}
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight traveling-light-text">
            Prior Auth Initiation & Approval Engine
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            Designed by Amar Shaw • Blending US Healthcare Operational Logic with Full-Stack Automation
          </p>
        </header>

        {/* Workspace Operations Grid */}
        <main className="space-y-6">
          <ExcelForm onDataFetch={processAndFetch} />

          {error && (
            <div className="max-w-xl mx-auto p-3.5 bg-red-950/40 border border-red-500/30 rounded-xl text-red-300 text-xs font-semibold text-center backdrop-blur-sm">
              ⚠️ {error}
            </div>
          )}

          <AuthForm />

          {activeAuthData && !loading && (
            <div className="text-center">
              <button
                onClick={clearWorkspace}
                className="text-xs font-medium text-rose-400 hover:text-rose-300 underline underline-offset-4 transition duration-150"
              >
                Clear Current Data Workspace
              </button>
            </div>
          )}

          <section className="mt-8">
            <FaxPreview />
          </section>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthAutomationProvider>
      <Workspace />
    </AuthAutomationProvider>
  );
}

