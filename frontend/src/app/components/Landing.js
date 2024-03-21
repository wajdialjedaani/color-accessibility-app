'use client';

import { Button } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import { uploadImage } from '../api/image/route';
import Integration from '../components/Integration';

export default function Landing({ setLoading }) {
    const [image, setImage] = useState(null);
    const [labels, setLabels] = useState([]);
    const fileInputRef = useRef(null); // Ref for the file input element

    const handleChange = (e) => {
        const file = e.target.files[0];
        resizeImageByScale(file)
            .then((resizedImage) => {
                setImage(resizedImage);
            })
            .catch((error) => {
                console.error('Error resizing image:', error);
            });
        setLabels([]);
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
                    resolve(
                        new File([blob], imageFile.name, { type: 'image/jpeg' })
                    );
                }, 'image/jpeg');
            };

            img.src = URL.createObjectURL(imageFile);
        });
    };

    const chooseImageScale = (w, h) => {
        const maxSize = 6 * Math.pow(10, 5);

        if (w * h <= maxSize) return 1;
        const scale = Math.sqrt(maxSize / (w * h));
        console.log(scale);
        return scale;
        // return 1;
    };

    const handleUpload = () => {
        if (image) {
            console.log('Uploading file:', image);
        } else {
            console.log('Please select a file');
        }

        setLoading(true);

        uploadImage(image).then((res) => {
            setLabels(res?.data?.label);
            console.log('Extracting labels done.')
        });
    };

    const handleClearImage = () => {
        setImage(null);
        setLabels([]);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="d-flex flex-column" style={{ margin: '2rem' }}>
            <h3> Color Recognition</h3>
            <div style={{ marginTop: '1rem' }}>
                <h5>
                    Unlock the Potential of Every Hue in 3 Effortless Steps:
                </h5>
                <ul>
                    <li>
                        Upload Image: Choose any image, whether it's a
                        photograph, artwork, or graphic, and effortlessly upload
                        it with just a click.
                    </li>

                    <li>
                        Identify Colors: With our intuitive system, explore your
                        image and simply click on any part to reveal the color
                        information instantly. Unveil the exact shades that
                        catch your eye and delve into their RGB or HEX values
                        with ease.
                    </li>

                    <li>
                        Discover Insights: Dive into the intricacies of your
                        chosen colors, from vibrant primaries to subtle pastels.
                        With each click, unlock a world of creative
                        possibilities and gain valuable insights to elevate your
                        projects.
                    </li>
                </ul>
            </div>
            <div style={{ marginTop: '1rem' }}>
                <h5>Choose an Image</h5>
                <div>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        ref={fileInputRef}
                    />
                </div>
                <Button
                    style={{
                        border: 'none',
                        backgroundColor: '#39545B',
                        margin: '1rem auto',
                    }}
                    onClick={handleUpload}
                >
                    GENERATE
                </Button>
                <Button
                    style={{
                        border: 'none',
                        backgroundColor: '#39545B',
                        margin: '1rem auto',
                        marginLeft: '0.5rem',
                    }}
                    onClick={handleClearImage}
                >
                    RESET
                </Button>
            </div>

            {image !== null && (
                <div>
                    <Integration file={image} labels={labels} setLoading={setLoading}/>
                </div>
            )}
        </div>
    );
}
