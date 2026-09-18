import React, { useState, useEffect } from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function AuthForm() {
  const { activeAuthData, loadExcelData } = useAuthAutomation();
  
  // Local state to manage live document overrides
  const [overrideData, setOverrideData] = useState({
    authStatus: 'Pending Review',
    clinicalNotes: '',
    denialReason: 'None'
  });

  // Effect hook to sync local modifiers whenever a new patient is pulled from Excel
  useEffect(() => {
    if (activeAuthData) {
      setOverrideData({
        authStatus: 'Pending Review',
        clinicalNotes: '',
        denialReason: activeAuthData.denialReason || 'None'
      });
    }
  }, [activeAuthData]);

  if (!activeAuthData) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOverrideData((prev) => ({ ...prev, [name]: value }));
  };

  // Pushing the modified details back up into the global context pipeline
  const handleApplyChanges = (e) => {
    e.preventDefault();
    const updatedPayload = {
      ...activeAuthData,
      denialReason: overrideData.denialReason,
      // Appending our new custom modifier parameters seamlessly
      authStatus: overrideData.authStatus,
      clinicalNotes: overrideData.clinicalNotes
    };
    loadExcelData(updatedPayload);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border border-orange-200 max-w-xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex h-2 w-2 rounded-full bg-orange-500"></span>
        <h3 className="text-lg font-bold text-gray-800">🛠️ RCM Workstation Overrides</h3>
      </div>
      <p className="text-xs text-gray-600 mb-4">
        Modify structural tracking parameters dynamically before finalizing the insurance fax payload.
      </p>

      <form onSubmit={handleApplyChanges} className="space-y-4 text-xs">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Authorization Tracking Status</label>
            <select
              name="authStatus"
              value={overrideData.authStatus}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 p-2 border bg-white"
            >
              <option value="Pending Review">⌛ Pending Review</option>
              <option value="Approved / Secured">✅ Approved / Secured</option>
              <option value="Retro Active Applied">⚡ Retro Active Applied</option>
              <option value="TFL Exceeded / Denied">❌ TFL Exceeded / Denied</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Active Denial Context</label>
            <input
              type="text"
              name="denialReason"
              value={overrideData.denialReason}
              onChange={handleInputChange}
              className="w-full rounded-md border-gray-300 p-2 border"
              placeholder="e.g., Missing Clinicals"
            />
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Clinical Override & Audit Notes</label>
          <textarea
            name="clinicalNotes"
            value={overrideData.clinicalNotes}
            onChange={handleInputChange}
            rows="2"
            className="w-full rounded-md border-gray-300 p-2 border font-mono"
            placeholder="Enter workflow updates or retro-auth authorization reference hashes..."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition duration-150 text-xs shadow-sm"
        >
          🔄 Apply Modifiers to Live Fax Template
        </button>
      </form>
    </div>
  );
}
