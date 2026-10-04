import React from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function FaxPreview() {
  const { activeAuthData } = useAuthAutomation();

  const handlePrint = () => {
    window.print();
  };

  // POLISHED DARK STANDBY CONTAINER (NO WHITE BOX)
  if (!activeAuthData) {
    return (
      <div className="bg-[#0A0E1A]/80 border border-dashed border-slate-800 rounded-2xl p-8 text-center backdrop-blur-sm transition-all duration-300">
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-slate-900 border border-slate-800 text-indigo-400 mb-3 shadow-[0_0_15px_rgba(99,102,241,0.15)]">
          📟
        </div>
        <div className="text-sm font-semibold text-slate-200 tracking-wide flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping"></span>
          Fax Generator Standby
        </div>
        <p className="text-xs text-slate-500 mt-2 max-w-sm mx-auto">
          Input row records in the controller panel to test single-click payload compilation.
        </p>
      </div>
    );
  }

  // GENERATED MANIFEST STATE
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between bg-[#0E1424] border border-slate-800/80 px-4 py-3 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-400">
            STANDARD FAX RENDER READY
          </span>
        </div>
        <button
          onClick={handlePrint}
          className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)] transition duration-150 flex items-center gap-1.5"
        >
          <span>🖨️</span>
          <span>Print / Save to PDF</span>
        </button>
      </div>

      {/* Retro-Clinical Manifest Sheet */}
      <div className="bg-white text-slate-950 p-8 rounded-xl font-mono text-xs border border-slate-200 shadow-2xl print:m-0 print:border-none">
        <div className="border-b-2 border-slate-950 pb-4 text-center">
          <h2 className="text-xl font-black tracking-tight">URGENT MEDICAL INSURANCE FAX TRANSITION</h2>
          <p className="text-[10px] text-slate-600 mt-1">SECURE HEALTHCARE WORKFLOW AUTOMATION PIPELINE MODULE</p>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 border-b border-slate-300 text-[11px]">
          <div>[01] DATE GENERATED: 05/10/2026</div>
          <div>[02] TIME STAMP: 02:10:00</div>
          <div>[03] SENDER ID: RCM-WORKSHOP-AUTO</div>
          <div>[04] OPERATOR CODE: AS-87</div>
          <div className="col-span-2">[05] TRANSACTION TYPE: {activeAuthData.authType?.toUpperCase() || 'PRIOR AUTH'}</div>
        </div>

        <div className="py-4 border-b border-slate-300 space-y-2">
          <div className="font-bold text-[11px]">SECTION A: INSURED PATIENT MANIFEST</div>
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-3 rounded border border-slate-200">
            <div>[06] PATIENT NAME: <span className="font-bold">{activeAuthData.patientName}</span></div>
            <div>[07] POLICY ID: <span className="font-bold">{activeAuthData.policyId}</span></div>
            <div>[08] PRIMARY GROUP: GRP-99482-KOL</div>
            <div>[09] PROCESS STATE: <span className="font-bold text-indigo-700">{activeAuthData.trackingStatus || 'PENDING REVIEW'}</span></div>
          </div>
        </div>

        <div className="py-4 space-y-2">
          <div className="font-bold text-[11px]">SECTION B: CLAIMS AUDIT & DENIAL TRACKING</div>
          <div className="text-[10px] text-slate-700 bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
            <div>[10] CURRENT DENIAL STATUS: {activeAuthData.denialContext || 'None'}</div>
            <div>[11] PRIORITY LEVEL: STAT / HIGH PRIORITY</div>
            <div className="pt-2 text-slate-500">[12] AUDIT NOTES: {activeAuthData.clinicalNotes || 'No custom notes.'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
