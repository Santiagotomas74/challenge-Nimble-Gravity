import React, { useState, useEffect } from 'react';
import { apiService } from './services/api';
import JobCard from './components/JobCard';
import './App.css';

function App() {
  const [candidate, setCandidate] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Email para el Step 2 (Cámbialo por el tuyo)
  const MY_EMAIL = "santiago_lucas1@hotmail.com"; 

  useEffect(() => {
    const initApp = async () => {
      try {
        setLoading(true);
        // Ejecutamos Step 2 y Step 3 en paralelo
        const [candidateData, jobsData] = await Promise.all([
          apiService.getCandidate(MY_EMAIL),
          apiService.getJobs()
        ]);
        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initApp();
  }, []);

  if (loading) return <div className="loader">Cargando desafío...</div>;
  if (error) return <div className="error-msg">❌ Error: {error}</div>;

  return (
    <div className="container">
      <header>
        <h1>Nimble Gravity Challenge</h1>
        {candidate && <p>Postulante: <strong>{candidate.firstName} {candidate.lastName}</strong></p>}
      </header>

      <div className="jobs-grid">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            candidate={candidate} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;