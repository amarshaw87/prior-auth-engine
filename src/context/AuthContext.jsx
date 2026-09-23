import React, { createContext, useState, useContext, useRef } from 'react';

// 1. Initializing the Context Blueprint
const AuthAutomationContext = createContext();

// 2. The Provider component that wraps your entire application
export function AuthAutomationProvider({ children }) {
  // Global state to hold the active patient/claim data fetched from the "Excel sheet"
  const [activeAuthData, setActiveAuthData] = useState(null);
  const [isAutomating, setIsAutomating] = useState(false);
  
  // Track active timeout instances to prevent race conditions during heavy usage
  const pipelineTimeoutRef = useRef(null);

  // Function to process and lock in the INITIAL data pipeline import with simulated extraction time
  const loadExcelData = (data) => {
    // Clear any existing active extraction timers before starting a new one
    if (pipelineTimeoutRef.current) {
      clearTimeout(pipelineTimeoutRef.current);
    }

    setIsAutomating(true);
    
    // Simulating a brief automated processing delay (1 second) for text extraction
    pipelineTimeoutRef.current = setTimeout(() => {
      setActiveAuthData(data);
      setIsAutomating(false);
    }, 1000);
  };

  // FIX: Dedicated fast-track modifier update function for workspace form overrides.
  // This bypasses the extraction loader so updates are instantaneous and don't flicker the screen.
  const updateAuthModifiers = (updatedData) => {
    setActiveAuthData(updatedData);
  };

  // Function to reset the workspace fields
  const clearWorkspace = () => {
    if (pipelineTimeoutRef.current) {
      clearTimeout(pipelineTimeoutRef.current);
    }
    setActiveAuthData(null);
    setIsAutomating(false);
  };

  return (
    <AuthAutomationContext.Provider value={{ 
      activeAuthData, 
      isAutomating, 
      loadExcelData, 
      updateAuthModifiers, // Shared safely across workstation forms
      clearWorkspace 
    }}>
      {children}
    </AuthAutomationContext.Provider>
  );
}

// 3. Custom hook to easily pull data inside any component
export function useAuthAutomation() {
  const context = useContext(AuthAutomationContext);
  if (!context) {
    throw new Error('useAuthAutomation must be used within an AuthAutomationProvider');
  }
  return context;
}
