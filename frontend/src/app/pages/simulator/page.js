'use client';

import React, { useState, useRef } from 'react';
import { simulateImage } from '../../api/simulation/simulateImage';
import SimulatorForm from '../../components/SimulatorForm';
import SimulatorDisplay from '../../components/SimulatorDisplay';

export default function Simulator() {
    const [image, setImage] = useState(null);
    const [resizedImage, setResizedImage] = useState(null);
    const [isLoad, setIsLoad] = useState(false);
    const [simulateType, setSimulateType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [fileChosen, setFileChosen] = useState(false);
    const fileInputRef = useRef(null);


    const handleChange = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        setImage(file);
        setFileChosen(true);
        setImageUrl('');
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
                console.log(img.width);
                console.log(img.height);
    
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
        if (w*h <= 300000) return 1;
      const scale = Math.sqrt(300000 / ( w*h));
      console.log(scale);
      return scale;
    }

    const handleUpload = () => {
        if (!fileChosen) {
            alert('Please choose a file before proceeding.');
            return;
        }

        if (image) {
            console.log('Uploading file:', image);
        } else {
            console.log('Please select a file');
        }

        setIsLoad(true);


        resizeImageByScale(image)
            .then(image => {
                setImage(image);

                simulateImage(image, simulateType).then(res => {
                  setIsLoad(false);
                  setImageUrl(res.modifiedImage)
                  //console.log(res.modifiedImage)

                
            });
        })
        .catch(error => {
            console.error('Error resizing image:', error);
            setIsLoad(false); 
        });
    };

    const handleChangeType = (event) => {
      setSimulateType(event.target.value);
      setImageUrl('');
    };

    const handleReset = () => {
        setImage(null);
        setSimulateType('');
        setImageUrl('');
        setResizedImage(null);
        setFileChosen(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
    <div>
        <title>True Hue | Color Simulator</title>
      {/* Header and Description */}
      <div style={{margin: '2rem'}}>
          <h3> Online Colorblindness Simulator</h3>
          <p>
              There are different types of colour blindness and in extremely rare cases people 
              are unable to see any colour at all, 
              but most colour blind people are unable to fully ‘see’ red, green or blue light.
          </p>
      
          <p>
              Find out what it is like to be colour blind by using color vision simulator. 
              This simulator allow you to upload your own images and enable you to simulate images on your screen. 
              There is a variety of methods implemented to simulate colour vision but please <b>note, no simulator is 100% accurate for each type or severity. </b>
          </p>
      </div>
      <SimulatorForm
        handleChange={handleChange}
        handleUpload={handleUpload}
        handleChangeType={handleChangeType}
        handleReset={handleReset}
        simulateType={simulateType}
        fileInputRef={fileInputRef}
      />

      <SimulatorDisplay
        simulateType={simulateType}
        resizedImage={image}
        imageUrl={imageUrl}
        isLoad={isLoad}
        />
        </div>
    );
}