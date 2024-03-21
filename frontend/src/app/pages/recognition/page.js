'use client';

import Landing from '../../components/Landing';
import Integration from '../../components/Integration';
import { useState } from 'react';
import { LoadingState } from '../../components/LoadingState';

function MyPage() {
    const [isLoad, setIsLoad] = useState(false);

    return (
        <div>

            {phase.phase === 'landing' && (
                <Landing sendPhase={handlePhaseChange} />
            )}
            {phase.phase === 'integration' && (
                <Integration sendPhase={handlePhaseChange} file={phase.file} labels={phase.labels}/>
            )}
            <title>True Hue | Color Recognition</title>
            <Landing setLoading={(e) => setIsLoad(e)} />
            {isLoad && <LoadingState />}
        </div>
    );
}

export default MyPage;
