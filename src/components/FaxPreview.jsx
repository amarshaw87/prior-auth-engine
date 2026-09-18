import React, { useRef } from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function FaxPreview() {
  const { activeAuthData, isAutomating } = useAuthAutomation();
  const printRef = useRef();

  // 1. Loading states during extraction sequence
  if (isAutomating) {
    return (
      <div className="p-8 bg-white border-2 border-dashed border-blue-300 rounded-lg text-center mt-6 shadow-sm">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
        <p className="text-blue-600 font-medium">⚡ AUTOMATION ACTIVE: Extracting data array from Excel pipeline...</p>
      </div>
    );
  }

  // 2. Empty state before pipeline activation
  if (!activeAuthData) {
    return (
      <div className="p-8 bg-white border-2 border-dashed border-gray-300 rounded-lg text-center mt-6 shadow-sm">
        <p className="text-gray-500 font-medium">📟 Fax Generator Standby</p>
        <p className="text-xs text-gray-400 mt-1">Input row records in the controller panel to test single-click form population.</p>
      </div>
    );
  }

  // 3. Document printing pipeline controller
  const handlePrintDocument = () => {
    window.print();
  };

  return (
    <div className="mt-6 max-w-2xl mx-auto space-y-4">
      {/* Action Bar Container */}
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg text-white shadow">
        <span className="text-xs font-semibold tracking-wider uppercase text-green-400 flex items-center gap-1">
          ● Standard Fax Render Ready
        </span>
        <button 
          onClick={handlePrintDocument}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-4 rounded text-xs transition duration-150 shadow"
        >
          🖨️ Print / Save to PDF
        </button>
      </div>

      {/* Main Medical Fax Document Container */}
      <div 
        ref={printRef}
        className="p-8 bg-white border border-gray-400 rounded-none shadow-md font-mono text-gray-900 text-xs leading-relaxed print:p-0 print:border-0 print:shadow-none"
        id="printable-medical-fax"
      >
        {/* Fax Header Blocks */}
        <div className="border-b-4 border-black pb-4 mb-6 text-center">
          <h2 className="text-2xl font-black tracking-tighter uppercase">URGENT MEDICAL INSURANCE FAX TRANSITION</h2>
          <p className="text-xxs tracking-widest text-gray-600 mt-1">SECURE HEALTHCARE WORKFLOW AUTOMATION PIPELINE MODULE</p>
        </div>

        {/* 15-Field Structured Data Layout Map */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3 border border-black p-4 bg-gray-50 mb-6">
          <div><span className="font-bold">[01] DATE GENERATED:</span> {new Date().toLocaleDateString()}</div>
          <div><span className="font-bold">[02] TIME STAMP:</span> {new Date().toLocaleTimeString()}</div>
          <div><span className="font-bold">[03] SENDER ID:</span> RCM-WORKSHOP-AUTO</div>
          <div><span className="font-bold">[04] OPERATOR CODE:</span> AS-87</div>
          <div className="col-span-2 border-t border-gray-300 pt-2">
            <span className="font-bold">[05] TRANSACTION TYPE:</span> <span className="underline font-black">{activeAuthData.authType.toUpperCase()} INITIATION</span>
          </div>
        </div>

        {/* Clinical Patient Segment Section */}
        <h4 className="text-sm font-black border-b-2 border-black pb-1 mb-3 uppercase">SECTION A: INSURED PATIENT MANIFEST</h4>
        <div className="grid grid-cols-2 gap-4 border border-black p-4 mb-6">
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[06] Patient Name Field</label>
            <span className="text-sm font-bold tracking-tight">{activeAuthData.patientName}</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[07] Insurance Policy ID Number</label>
            <span className="text-sm font-bold tracking-mono text-blue-800">{activeAuthData.insuranceId}</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[08] Primary Group ID Code</label>
            <span>GRP-99482-KOL</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[09] Coverage Status Hook</label>
            <span className="text-green-700 font-bold">ACTIVE PIPELINE</span>
          </div>
        </div>

        {/* Operational Core Audit Section */}
        <h4 className="text-sm font-black border-b-2 border-black pb-1 mb-3 uppercase">SECTION B: CLAIMS AUDIT & DENIAL TRACKING</h4>
        <div className="grid grid-cols-2 gap-4 border border-black p-4 mb-6">
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[10] Current Denial Status</label>
            <span className="font-bold text-red-600">{activeAuthData.denialReason || 'None'}</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[11] Priority Assessment Level</label>
            <span>STAT / HIGH PRIORITY</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[12] Historical Audit Bench</label>
            <span>Sunknowledge 50/Day Pipeline Metric Passed</span>
          </div>
          <div>
            <label className="block text-xxs font-bold text-gray-500 uppercase">[13] Processing Target Unit</label>
            <span>NextZen Minds Core Integration Suite</span>
          </div>
        </div>

        {/* Footer Audit Compliance Track Verification */}
        <div className="border-t-2 border-black pt-4 text-center text-xxs text-gray-500 space-y-1">
          <p>[14] COMPLIANCE NOTICE: This document handles confidential medical processing metrics.</p>
          <p>[15] SYSTEM TRACKING HASH: SHA256-REACT-CONTEXT-API-VERIFIED-DATA-STREAM-AMAR-SHAW-87</p>
        </div>
      </div>
    </div>
  );
}

