'use client';

import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import { uploadImage } from '../api/image/route'
import { findSignificantColors } from '../api/palette/findSignificantColors';
import { LoadingState } from './LoadingState';

export default function Landing({ sendPhase }) {
    const [image, setImage] = useState(null);
    const [isLoad, setIsLoad] = useState(false);

    const handleChange = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        setImage(file);
    };

    const resizeImageByScale = (imageFile) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                const scale = chooseImageScale(img.width, img.height);

                const newWidth = img.width * scale;
                const newHeight = img.height * scale;
    
                canvas.width = newWidth;
                canvas.height = newHeight;
    
                ctx.drawImage(img, 0, 0, newWidth, newHeight);
    
                canvas.toBlob((blob) => {
                    resolve(new File([blob], imageFile.name, { type: 'image/jpeg' }));
                }, 'image/jpeg');
            };
    
            img.src = URL.createObjectURL(imageFile);
        });
    };

    const chooseImageScale = (w, h) => {
        console.log('frontend:', w*h)
    //     if (w*h <= 300000) return 1;
    //   const scale = Math.sqrt(300000 / ( w*h));
    //   console.log(scale);
    //   return scale;
    return 1;
    }

    const handleUpload = () => {
        if (image) {
            console.log('Uploading file:', image);
        } else {
            console.log('Please select a file');
        }

        setIsLoad(true);

        resizeImageByScale(image)
            .then(resizedImage => {
                setImage(resizedImage)

                uploadImage(resizedImage).then(res => {
                setIsLoad(false);
                sendPhase({
                    phase: 'integration',
                    file: resizedImage,
                    labels: res?.data?.label
                });
            });
        })
        .catch(error => {
            console.error('Error resizing image:', error);
            setIsLoad(false); 
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
                <LoadingState />
            )}
        </div>
        </div>
    );
}
