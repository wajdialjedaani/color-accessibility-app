import React from 'react';
import { LoadingState } from './LoadingState';

const SimulatorDisplay = ({ resizedImage, imageUrl, simulateType, isLoad }) => {
  return (
    <div style={{ margin: "1.5rem"}}>
    {isLoad && (
        <LoadingState />
    )}

    <div style={{ margin: "1rem", width: "100%", display: "flex", justifyContent: "space-evenly"}}>
        {resizedImage && (
                <div style={{ marginTop: '1.5rem' }}>
                  <h6> Normal Vision </h6>
                    <img
                        src={URL.createObjectURL(resizedImage)}
                        alt="Resized Image"
                        style={{ maxWidth: '100%', maxHeight: '600px' }}
                    />
                </div>
            )}
        {imageUrl && (
                <div style={{ margin: '1.5rem' }}>
                  <h6> {simulateType} Vision </h6>
                    <img
                        src={`data:image/jpeg;base64,${imageUrl}`}
                        alt="Modified Image"
                        style={{ maxWidth: '100%', maxHeight: '600px' }}
                    />
                </div>
            )}
        </div>
    </div>
  );
};

export default SimulatorDisplay;
