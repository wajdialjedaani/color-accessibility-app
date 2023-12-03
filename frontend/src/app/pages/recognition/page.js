'use client';

import Landing from '../../components/Landing';
import Correction from '../../components/Correction';
import Compare from '../../components/Compare';
import Integration from '../../components/Integration';
import { useState } from 'react';

function MyPage() {
    const [phase, setPhase] = useState({
        phase: 'landing',
        file: null,
        labels: null
    });

    const handlePhaseChange = (newPhase) => {
        setPhase(newPhase);
    };

    return (
        <div>
            {phase.phase === 'landing' && (
                <Landing sendPhase={handlePhaseChange} />
            )}
            {phase.phase === 'integration' && (
                <Integration sendPhase={handlePhaseChange} file={phase.file} labels={phase.labels}/>
            )}
            {phase.phase === 'correction' && (
                <Correction sendPhase={handlePhaseChange} />
            )}
            {phase.phase === 'analystFeedback' && <Compare />}
        </div>
    );
}

export default MyPage;
