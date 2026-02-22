import React, { useState } from 'react';
import { apiService } from '../services/api';

const JobCard = ({ job, candidate }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!repoUrl.includes('github.com')) {
      alert('Por favor ingresa una URL válida de GitHub');
      return;
    }

    setStatus('loading');
    try {
      const payload = {
        uuid: candidate.uuid,
        jobId: job.id,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl: repoUrl
      };

      await apiService.applyToJob(payload);
      setStatus('success');
      setMessage('¡Postulación enviada con éxito!');
    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  };

  return (
    <div className={`job-card ${status}`}>
      <h3>{job.title}</h3>
      <p className="job-id">ID: {job.id}</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="URL del Repositorio GitHub"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          required
          disabled={status === 'loading' || status === 'success'}
        />
        <button 
          type="submit" 
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado' : 'Submit Application'}
        </button>
      </form>
      
      {message && <p className={`status-msg ${status}`}>{message}</p>}
    </div>
  );
};

export default JobCard;