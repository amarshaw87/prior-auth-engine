import React, { useState } from 'react';

export default function ExcelForm({ onDataFetch }) {
  // 1. Simulating an Excel row data state
  const [excelRow, setExcelRow] = useState({
    patientName: '',
    insuranceId: '',
    authType: 'Prior Auth', // Default select option
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
    if (!excelRow.patientName || !excelRow.insuranceId) {
      alert("Please fill in the Excel row data to simulate fetching!");
      return;
    }
    // Sending the mapped data up to the parent component
    onDataFetch(excelRow);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-gray-200 max-w-xl mx-auto mt-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">📊 Excel Data Pipeline Simulator</h3>
      <p className="text-sm text-gray-600 mb-6">Input manual row data to simulate an Excel sheet fetch pipeline.</p>
      
      <form onSubmit={handleTriggerAutomation} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Patient Name</label>
          <input 
            type="text" 
            name="patientName"
            value={excelRow.patientName} 
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" 
            placeholder="John Doe"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Insurance Policy ID</label>
          <input 
            type="text" 
            name="insuranceId"
            value={excelRow.insuranceId} 
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:ring-blue-500 focus:border-blue-500" 
            placeholder="BCBS-987654"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Authorization Type</label>
          <select 
            name="authType"
            value={excelRow.authType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border bg-white"
          >
            <option value="Prior Auth">Prior Auth</option>
            <option value="Retro Auth">Retro Auth</option>
            <option value="Re-auth">Re-auth</option>
          </select>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
        >
          ⚡ Simulate One-Click Fax Auto-Fill
        </button>
      </form>
    </div>
  );
}

