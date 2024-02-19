import React from 'react';
import { Spinner } from 'react-bootstrap';

const SimulatorDisplay = ({ resizedImage, imageUrl, simulateType, isLoad }) => {
  return (
    <div style={{ position: 'relative' }}>
    {isLoad && (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, 
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'white',
                }}
            >
                <Spinner animation="border" variant="light" />
                <span>Processing...</span>
            </div>
        </div>
    )}

    <div style={{margin: "2rem", width: "100%", display: "flex", justifyContent: "space-evenly"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
        {resizedImage && (
                <div style={{ marginTop: '2rem' }}>
                  <h6> Normal Vision </h6>
                    <img
                        src={URL.createObjectURL(resizedImage)}
                        alt="Resized Image"
                        style={{ marginRight: '3rem', maxWidth: '100%', maxHeight: '400px' }}
                    />
                </div>
            )}
        {imageUrl && (
                <div style={{ marginTop: '2rem' }}>
                  <h6> {simulateType} Vision </h6>
                    <img
                        src={`data:image/jpeg;base64,${imageUrl}`}
                        alt="Modified Image"
                        style={{ maxWidth: '100%', maxHeight: '400px' }}
                    />
                </div>
            )}
        </div>
        </div>
    </div>
  );
};

export default SimulatorDisplay;