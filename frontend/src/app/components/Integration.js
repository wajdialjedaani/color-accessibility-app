import Image from 'next/image';
import pic from '../public/example.png';
import { Card, ListGroup } from 'react-bootstrap';
import React, { useRef, useEffect, useState  } from 'react';


const Integration = () => {
    const imageRef = useRef(null);
    const [color, setColor] = useState({ name: '', hex: '', rgb: '' });



    const findColorName = async (input) => {
        const red = input[0];
        const green = input[1];
        const blue = input[2];
        try {
            const response = await fetch(`https://www.thecolorapi.com/id?rgb=${red},${green},${blue}&format=json`)
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
        <div>
            <div className="box">
                <Image 
                    src={pic} 
                    style={{ width: '100%', height: 'auto' }}
                    ref={imageRef}
                    alt="Image"
                    onClick={handleImageClick}
                />
            </div>
            <Card style={{ width: '18rem' }}>
                <Card.Header>Color Picker</Card.Header>
                <ListGroup variant="flush">
                    <ListGroup.Item>Name : {color.name}</ListGroup.Item>
                    <ListGroup.Item>HEX: {color.hex}</ListGroup.Item>
                    <ListGroup.Item>RGB: {color.rgb}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
}

export default Integration;