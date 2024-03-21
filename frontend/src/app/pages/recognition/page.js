'use client';

import Landing from '../../components/Landing';
import { useState } from 'react';
import { LoadingState } from '../../components/LoadingState';

function MyPage() {
    const [isLoad, setIsLoad] = useState(false);

    return (
        <div>
            <title>True Hue | Color Recognition</title>
            <Landing setLoading={(e) => setIsLoad(e)} />

            {isLoad && <LoadingState />}
        </div>
    );
}

export default MyPage;
