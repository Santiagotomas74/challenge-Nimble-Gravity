const BASE_URL = 'https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net/api';

export const apiService = {

  getCandidate: async (email) => {
    const response = await fetch(`${BASE_URL}/candidate/get-by-email?email=${email}`);
    if (!response.ok) throw new Error('Error al obtener candidato');
    console.log('Datos del candidato obtenidos:', await response.clone().json());
    return response.json();
  },


  getJobs: async () => {
    const response = await fetch(`${BASE_URL}/jobs/get-list`);
    if (!response.ok) throw new Error('Error al obtener posiciones');
    return response.json();
  },




applyToJob: async (data) => {
 
  const payload = {
    uuid: data.uuid,
    jobId: String(data.jobId),
    candidateId: String(data.candidateId),
    applicationId: String(data.applicationId),
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