import React from 'react';
import { AuthAutomationProvider, useAuthAutomation } from './context/AuthContext';
import ExcelForm from './components/ExcelForm';
import AuthForm from './components/AuthForm';
import FaxPreview from './components/FaxPreview';

function Workspace() {
  const { loadExcelData, clearWorkspace, activeAuthData } = useAuthAutomation();

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Prior Auth Initiation & Approval Engine
          </h1>
          <p className="text-md text-gray-600 mt-2">
            Designed by Amar Shaw • Blending RCM Operational Logic with Full-Stack Automation
          </p>
        </header>

        {/* Workspace Operations Grid */}
        <main className="space-y-6">
          {/* Top Section: Excel Data Input */}
          <ExcelForm onDataFetch={loadExcelData} />

          {/* Middle Section: Manual Overrides Panel */}
          <AuthForm />

          {/* Reset Workspace Controller Button */}
          {activeAuthData && (
            <div className="text-center">
              <button
                onClick={clearWorkspace}
                className="text-sm font-medium text-red-600 hover:text-red-800 underline transition duration-150"
              >
                Clear Current Data Workspace
              </button>
            </div>
          )}

          {/* Bottom Section: Document Generator Output */}
          <section className="mt-8">
            <FaxPreview />
          </section>
        </main>
      </div>
    </div>
  );
}

// Final wrapper linking everything to your context blueprint
export default function App() {
  return (
    <AuthAutomationProvider>
      <Workspace />
    </AuthAutomationProvider>
  );
}
