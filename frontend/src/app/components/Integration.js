// import pic from '../public/example.png';
import React, { useRef, useState } from 'react';
import ColorInfo from './ColorInfo';
import { Image, Form, Button } from 'react-bootstrap';
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

    const getColorIndex = (e) => {
        const imageElement = imageRef.current;
        const rect = imageElement?.getBoundingClientRect();

        const xRatio = (e.clientX - rect.left) / imageElement.width;
        const yRatio = (e.clientY - rect.top) / imageElement.height;

        const x = Math.floor(xRatio * imageElement.naturalWidth);
        const y = Math.floor(yRatio * imageElement.naturalHeight);

        const index = labels[y * imageElement.naturalWidth + x];

        return index;
    }

    const handleImageClick = (e) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const x = e.nativeEvent.offsetX;
        const y = e.nativeEvent.offsetY;

        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;

        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

        const pixelData = ctx.getImageData(x, y, 1, 1).data;

        const colorIndex = getColorIndex(e);

        findColorName(pixelData, color_dict[colorIndex]);
    };

    return (
      <div style={{margin: "2rem", width: "100%", display: "flex", justifyContent: "space-evenly"}}>
        <div style={{display: "flex", justifyContent: "center"}}>
            {file &&
                <div style={{maxHeight: "50rem"}}>
                <Image 
                src={URL.createObjectURL(file)} 
                ref={imageRef}
                alt="Image"
                fluid
                onClick={handleImageClick}
                style={{maxHeight: "50rem"}}/>
            </div>
            }
        </div>
        <div>
            {labels?.length !== 0 &&
                <ColorInfo color={color} />
            }

            {/* <div style={{marginTop: '2rem'}}>
                <h5>Color Correct</h5>
                <div style={{height: '1px', width: '100%', backgroundColor: 'black'}}></div>
                <div style={{margin: "1rem auto 0.5rem auto"}}>Choose a Type of Color Blindness</div>
                <Form.Select aria-label="Default select example" style={{marginTop: '1rem'}}>
                    <option value="1">Yellow</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </Form.Select>
                <Button
                style={{ backgroundColor: '#39545B', margin: "1rem auto" }}
            >
                CORRECT COLORS
            </Button>
            </div> */}
        </div>
      </div>
    );
};

export default Integration;
