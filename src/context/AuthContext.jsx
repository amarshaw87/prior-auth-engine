import React, { createContext, useState, useContext, useRef } from 'react';

const AuthAutomationContext = createContext();

export function AuthAutomationProvider({ children }) {
  const [activeAuthData, setActiveAuthData] = useState(null);
  const [isAutomating, setIsAutomating] = useState(false);
  const pipelineTimeoutRef = useRef(null);

  const loadExcelData = (data) => {
    if (pipelineTimeoutRef.current) {
      clearTimeout(pipelineTimeoutRef.current);
    }

    setIsAutomating(true);

    pipelineTimeoutRef.current = setTimeout(() => {
      setActiveAuthData(data);
      setIsAutomating(false);
    }, 600); // 600ms extraction simulation
  };

  const updateAuthModifiers = (updatedData) => {
    setActiveAuthData(updatedData);
  };

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
      updateAuthModifiers,
      clearWorkspace 
    }}>
      {children}
    </AuthAutomationContext.Provider>
  );
}

export function useAuthAutomation() {
  const context = useContext(AuthAutomationContext);
  if (!context) {
    throw new Error('useAuthAutomation must be used within an AuthAutomationProvider');
  }
  return context;
}

