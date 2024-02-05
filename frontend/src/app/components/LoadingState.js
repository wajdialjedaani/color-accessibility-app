import { Spinner } from 'react-bootstrap';

export const LoadingState = () =>{
    return (
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
            <span>Analyzing your image. Please hold on for a moment.</span>
        </div>
    </div>
    )
}