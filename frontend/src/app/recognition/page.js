'use client'

import Landing from '../components/Landing';
import Correction from '../components/Correction';
import Compare from '../components/Compare';
import Integration from '../components/Integration';
import { useState } from 'react';

function MyPage() {
  const [phase, setPhase] = useState('landing');

  const handlePhaseChange = (newPhase) => {
    setPhase(newPhase);
  };

  return (
    <div>
      {phase === 'landing' && (
        <Landing sendPhase={handlePhaseChange}/>
      )}
      {phase === 'integration' && (
        <Integration sendPhase={handlePhaseChange}/>
      )}
      {phase === 'correction' && (
        <Correction sendPhase={handlePhaseChange}/>
      )}
      {phase === 'analystFeedback' && (
        <Compare />
      )}
    </div>
  );
}

export default MyPage;
