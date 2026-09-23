import React, { useState } from 'react';
import { useAuthAutomation } from '../context/AuthContext'; // FIX: Bring in your global state workspace

export default function ExcelForm() {
  // FIX: Access the central loading pipeline directly from your custom hook
  const { loadExcelData } = useAuthAutomation();

  // 1. Simulating an Excel row data state
  const [excelRow, setExcelRow] = useState({
    patientName: '',
    insuranceId: '',
    authType: 'Prior Auth', 
    denialReason: 'None'
  });

  // 2. Handling controlled input changes safely
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExcelRow((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 3. Triggering the "One-Click Fax Fetch" simulation
  const handleTriggerAutomation = (e) => {
    e.preventDefault();
    
    // Core data sanitation (simulate internal useFaxFetch string cleaning rules)
    const sanitizedPatientName = excelRow.patientName.trim();
    const sanitizedInsuranceId = excelRow.insuranceId.trim().toUpperCase();

    if (!sanitizedPatientName || !sanitizedInsuranceId) {
      alert("Please fill in the Excel row data to simulate fetching!");
      return;
    }

    // Building the sanitized payload complete with matching override hooks for AuthForm.jsx
    const finalizedPayload = {
      ...excelRow,
      id: `CLM-${Date.now()}`, // Generating a temporary unique tracking ID for our new useEffect hooks
      patientName: sanitizedPatientName,
      insuranceId: sanitizedInsuranceId,
      authStatus: 'Pending Review', // Populating structural defaults for downstream workstations
      clinicalNotes: ''
    };

    // Sending the mapped data straight up into the global context pipeline safely
    loadExcelData(finalizedPayload);
    
    // Optional: Reset inputs to allow operators to process another row
    setExcelRow({
      patientName: '',
      insuranceId: '',
      authType: 'Prior Auth',
      denialReason: 'None'
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-2 w-2 rounded-full bg-blue-500"></span>
        <h3 className="text-xl font-bold text-gray-800">📊 Excel Data Pipeline Simulator</h3>
      </div>
      <p className="text-xs text-gray-600 mb-6">
        Input manual row data to simulate an enterprise Excel sheet fetch pipeline.
      </p>
      
      <form onSubmit={handleTriggerAutomation} className="space-y-4 text-xs">
        <div>
          <label htmlFor="patientName" className="block font-medium text-gray-700 mb-1">
            Patient Name
          </label>
          <input 
            id="patientName"
            type="text" 
            name="patientName"
            value={excelRow.patientName} 
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 p-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="insuranceId" className="block font-medium text-gray-700 mb-1">
            Insurance Policy ID
          </label>
          <input 
            id="insuranceId"
            type="text" 
            name="insuranceId"
            value={excelRow.insuranceId} 
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 p-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none font-mono" 
            placeholder="BCBS-987654"
          />
        </div>

        <div>
          <label htmlFor="authType" className="block font-medium text-gray-700 mb-1">
            Authorization Type
          </label>
          <select 
            id="authType"
            name="authType"
            value={excelRow.authType}
            onChange={handleInputChange}
            className="w-full rounded-md border-gray-300 p-2 border bg-white focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            <option value="Prior Auth">Prior Auth</option>
            <option value="Retro Auth">Retro Auth</option>
            <option value="Re-auth">Re-auth</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded transition duration-150 text-xs shadow-sm active:scale-[0.99] mt-2"
        >
          ⚡ Simulate One-Click Fax Auto-Fill
        </button>
      </form>
    </div>
  );
}
