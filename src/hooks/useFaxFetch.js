import { useState } from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function useFaxFetch() {
  const [error, setError] = useState(null);
  const { loadExcelData, isAutomating } = useAuthAutomation();

  const processAndFetch = (formData) => {
    setError(null);

    const name = formData?.patientName || formData?.patient_name || formData?.name;
    const policy = formData?.policyId || formData?.insurance_id || formData?.id;
    const authType = formData?.authType || 'Prior Auth';

    if (!name || !policy) {
      setError('Patient Name and Insurance ID are required fields.');
      return;
    }

    // Calls AuthContext pipeline function directly
    loadExcelData({
      patientName: name,
      policyId: policy,
      authType: authType,
      trackingStatus: 'Pending Review',
      denialContext: 'None',
      clinicalNotes: 'Pipeline verified data stream // NextZen Minds Suite'
    });
  };

  return { processAndFetch, loading: isAutomating, error };
}

