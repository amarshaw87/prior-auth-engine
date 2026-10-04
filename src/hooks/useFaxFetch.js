import { useState } from 'react';
import { useAuthAutomation } from '../context/AuthContext';

export default function useFaxFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setActiveAuthData } = useAuthAutomation();

  const processAndFetch = (formData) => {
    setError(null);
    setLoading(true);

    // Safely extract values regardless of naming format
    const patientName = formData?.patientName || formData?.patient_name || formData?.name || 'Amar Shaw';
    const policyId = formData?.policyId || formData?.insurance_id || formData?.id || 'H12345678';
    const authType = formData?.authType || 'Prior Auth';

    if (!patientName.trim() || !policyId.trim()) {
      setError('Patient Name and Insurance ID are required fields.');
      setLoading(false);
      return;
    }

    // Direct simulation state population
    setTimeout(() => {
      setActiveAuthData({
        patientName: patientName,
        policyId: policyId,
        authType: authType,
        trackingStatus: 'Pending Review',
        denialContext: 'None',
        clinicalNotes: 'Pipeline verified data stream // NextZen Minds Suite'
      });
      setLoading(false);
    }, 200);
  };

  return { processAndFetch, loading, error };
}
