import React, { useState } from 'react';

export default function ExcelForm({ onDataFetch }) {
  const [patientName, setPatientName] = useState('');
  const [policyId, setPolicyId] = useState('');
  const [authType, setAuthType] = useState('Prior Auth');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onDataFetch) {
      onDataFetch({
        patientName: patientName.trim(),
        policyId: policyId.trim(),
        authType: authType
      });
    }
  };

  return (
    <div className="bg-[#0E1424]/90 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">📊</span>
        <h2 className="text-lg font-bold text-slate-100">Excel Data Pipeline Simulator</h2>
      </div>
      <p className="text-xs text-slate-400 mb-5">
        Input manual row data to simulate an enterprise Excel sheet fetch pipeline.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Patient Name
          </label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
            placeholder="e.g. John Doe"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Insurance Policy ID
          </label>
          <input
            type="text"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
            placeholder="e.g. BCBS-987654"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Authorization Type
          </label>
          <select
            value={authType}
            onChange={(e) => setAuthType(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-slate-100 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition duration-150"
          >
            <option value="Prior Auth">Prior Auth</option>
            <option value="Retro Auth">Retro Auth</option>
            <option value="Pre-Determination">Pre-Determination</option>
          </select>
        </div>

        {/* Glow Action Button */}
        <button
          type="submit"
          className="w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-500 shadow-[0_0_25px_rgba(99,102,241,0.45)] hover:shadow-[0_0_35px_rgba(99,102,241,0.65)] transition-all duration-200 active:scale-[0.99] flex items-center justify-center gap-2"
        >
          <span>⚡</span>
          <span>Simulate One-Click Fax Auto-Fill</span>
        </button>
      </form>
    </div>
  );
}

