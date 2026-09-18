import React, { createContext, useState, useContext } from 'react';

// 1. Initializing the Context Blueprint
const AuthAutomationContext = createContext();

// 2. The Provider component that wraps your entire application
export function AuthAutomationProvider({ children }) {
  // Global state to hold the active patient/claim data fetched from the "Excel sheet"
  const [activeAuthData, setActiveAuthData] = useState(null);
  const [isAutomating, setIsAutomating] = useState(false);

  // Function to process and lock in the fetched data pipeline
  const loadExcelData = (data) => {
    setIsAutomating(true);
    
    // Simulating a brief automated processing delay (1 second)
    setTimeout(() => {
      setActiveAuthData(data);
      setIsAutomating(false);
    }, 1000);
  };

  // Function to reset the workspace fields
  const clearWorkspace = () => {
    setActiveAuthData(null);
  };

  return (
    <AuthAutomationContext.Provider value={{ 
      activeAuthData, 
      isAutomating, 
      loadExcelData, 
      clearWorkspace 
    }}>
      {children}
    </AuthAutomationContext.Provider>
  );
}

// 3. Custom hook to easily pull data inside any component
export function useAuthAutomation() {
  return useContext(AuthAutomationContext);
}

