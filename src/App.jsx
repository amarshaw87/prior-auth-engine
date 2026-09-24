import React from 'react';
import ReactDOM from 'react-dom/client'; // <-- ADDED FOR MOUNT PIPELINE
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Prior Auth Initiation & Approval Engine
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Designed by Amar Shaw • Blending RCM Operational Logic with Full-Stack Automation
          </p>
        </header>

        {/* Workspace Operations Grid */}
        <main className="space-y-6">
          <ExcelForm onDataFetch={processAndFetch} />

          {error && (
            <div className="max-w-xl mx-auto p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-xs font-semibold text-center">
              ⚠️ {error}
            </div>
          )}

          <AuthForm />

          {activeAuthData && !loading && (
            <div className="text-center">
              <button
                onClick={clearWorkspace}
                className="text-xs font-medium text-red-600 hover:text-red-800 underline transition duration-150"
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

// Core wrapper linking everything to your context blueprint
// Core wrapper linking everything to your context blueprint
export default function App() {
  return (
    <AuthAutomationProvider>
      <Workspace />
    </AuthAutomationProvider>
  );
}

// FIX: Initialize the React DOM mounting layer safely with a null-check
const container = document.getElementById('root');
if (container) {
  ReactDOM.createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

