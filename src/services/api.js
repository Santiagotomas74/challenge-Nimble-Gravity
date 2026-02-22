const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api';

export const apiService = {
  // Step 2: Obtener datos del candidato
  getCandidate: async (email) => {
    const response = await fetch(`${BASE_URL}/candidate/get-by-email?email=${email}`);
    if (!response.ok) throw new Error('Error al obtener candidato');
    console.log('Datos del candidato obtenidos:', await response.clone().json());
    return response.json();
  },

  // Step 3: Obtener lista de trabajos
  getJobs: async () => {
    const response = await fetch(`${BASE_URL}/jobs/get-list`);
    if (!response.ok) throw new Error('Error al obtener posiciones');
    return response.json();
  },

  // Step 5: Enviar postulación
 // src/services/api.js

// src/services/api.js

applyToJob: async (data) => {
  // Construimos el body exactamente como lo pide el error de la API
  const payload = {
    uuid: data.uuid,
    jobId: String(data.jobId),
    candidateId: String(data.candidateId),
    applicationId: String(data.applicationId), // <-- ESTE ES EL QUE FALTABA
    repoUrl: data.repoUrl
  };

  const response = await fetch(`${BASE_URL}/candidate/apply-to-job`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();

  if (!response.ok) {
    console.error("Detalle del error:", result);
    throw new Error(result.error || 'Error en los campos enviados');
  }

  return result;
}
};