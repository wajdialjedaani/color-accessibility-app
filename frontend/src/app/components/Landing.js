'use client';

import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { uploadImage, getImageById } from '../api/image/route'

export default function Landing({ sendPhase }) {
    const [image, setImage] = useState(null);

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

        const formData = new FormData();
        formData.append('image', image);

        uploadImage(formData).then(data => getImageById(data?.id).then(data => setImage(data.image)))
            
        sendPhase({
            phase: 'integration',
            file: image,
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
        </div>
    );
}
