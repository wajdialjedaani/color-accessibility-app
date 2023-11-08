// import pic from '../public/example.png';
import React, { useRef, useState } from 'react';
import ColorInfo from './ColorInfo';
import { Row, Col, Image } from 'react-bootstrap';

const Integration = ({ sendPhase, file }) => {
    const imageRef = useRef(null);
    const [color, setColor] = useState({ name: '', hex: '', rgb: '' });

    const findColorName = async (input) => {
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
            setColor({ name, hex, rgb });
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
        findColorName(pixelData);
    };

    return (
      <Row style={{margin: "2rem", width: "100%", flex: "1.5 1.5"}}>
        <Col md={9} style={{display: "flex", justifyContent: "center"}}>
            <div style={{maxHeight: "50rem"}}>
                <Image 
                src={URL.createObjectURL(file)} 
                ref={imageRef}
                alt="Image"
                onClick={handleImageClick}
                fluid 
                style={{maxHeight: "50rem"}}/>
            </div>
        </Col>
        <Col md={3}>
            <ColorInfo color={color} />
        </Col>
      </Row>
    );
};

export default Integration;
