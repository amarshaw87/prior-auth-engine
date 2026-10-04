import React from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function AuthForm() {
  const { activeAuthData, updateAuthField } = useAuthAutomation();

  if (!activeAuthData) return null;

  return (
    <div className="bg-[#0E1424]/90 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-xl">⚙️</span>
        <h2 className="text-lg font-bold text-slate-100">RCM Workstation Overrides</h2>
      </div>
      <p className="text-xs text-slate-400 mb-5">
        Modify structural tracking parameters dynamically before finalizing the insurance fax payload.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Authorization Tracking Status
          </label>
          <select
            value={activeAuthData.trackingStatus || 'Pending Review'}
            onChange={(e) => updateAuthField('trackingStatus', e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-amber-400 font-medium text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="Pending Review">Pending Review</option>
            <option value="Approved">Approved</option>
            <option value="In Progress">In Progress</option>
            <option value="Denied">Denied</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Active Denial Context
          </label>
          <input
            type="text"
            value={activeAuthData.denialContext || ''}
            onChange={(e) => updateAuthField('denialContext', e.target.value)}
            placeholder="None"
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">
            Clinical Override & Audit Notes
          </label>
          <textarea
            rows="3"
            value={activeAuthData.clinicalNotes || ''}
            onChange={(e) => updateAuthField('clinicalNotes', e.target.value)}
            placeholder="Enter workflow updates or retro-authorization reference hashes..."
            className="w-full px-3.5 py-2.5 bg-[#070A12] border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
}
