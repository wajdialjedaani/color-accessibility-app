// import pic from '../public/example.png';
import React, { useRef, useState } from 'react';
import ColorInfo from './ColorInfo';
import { Row, Col, Image } from 'react-bootstrap';
import { color_dict } from '../constants';

const Integration = ({ sendPhase, file, labels }) => {
    const imageRef = useRef(null);
    const [color, setColor] = useState({ name: '', hex: '', rgb: '', label: '' });

    const findColorName = async (input, label) => {
        const red = input[0];
        const green = input[1];
        const blue = input[2];
        try {
            const response = await fetch(
                `https://www.thecolorapi.com/id?rgb=${red},${green},${blue}&format=json`
            );
            const data = await response.json();
            const name = data.name.value;
            const hex = data.hex.value;
            const rgb = data.rgb.value;

            setColor({ name, hex, rgb, label });
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageClick = (e) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;
        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        const colorIndex = labels[y * canvas.width + x];

        findColorName(pixelData, color_dict[colorIndex]);
    };

    return (
      <div style={{margin: "2rem", width: "100%", display: "flex", justifyContent: "space-evenly"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{maxHeight: "50rem"}}>
                <Image 
                src={URL.createObjectURL(file)} 
                ref={imageRef}
                alt="Image"
                onClick={handleImageClick}
                fluid 
                style={{maxHeight: "50rem"}}/>
            </div>
        </div>
        <div>
            <ColorInfo color={color} />
        </div>
      </div>
    );
};

export default Integration;
