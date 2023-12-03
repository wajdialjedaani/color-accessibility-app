'use client';

import { Button, Form, Spinner } from 'react-bootstrap';
import React, { useState } from 'react';
import { uploadImage } from '../api/image/route'

export default function Landing({ sendPhase }) {
    const [image, setImage] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        setImage(file);
    };

    const handleUpload = () => {
        if (image) {
            console.log('Uploading file:', image);
        } else {
            console.log('Please select a file');
        }

        setIsLoad(true);

        const formData = new FormData();
        formData.append('image', image);

        uploadImage(formData).then(res => {
            console.log(res.data);
            setIsLoad(false);
            sendPhase({
                phase: 'integration',
                file: image,
                labels: res?.data?.label.Labels
            });
        });
        
    };

    return (
        <div>
            <div className="box">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
            <Button
                className="upload"
                style={{ backgroundColor: '#39545B' }}
                onClick={handleUpload}
            >
                GENERATE
            </Button>

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
                        <span>Analyzing your image. Please hold on for a moment.</span>
                    </div>
                </div>
            )}
        </div>
        </div>
    );
}
