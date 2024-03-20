// import pic from '../public/example.png';
import React, { useRef, useState, useEffect } from 'react';
import ColorInfo from './ColorInfo';
import { Image, Form, Button } from 'react-bootstrap';
import { color_dict } from '../constants';

const Integration = ({ sendPhase, file, labels }) => {
    const imageRef = useRef(null);
    const [isModified, setIsModified] = useState(false);
    const [modifiedImage, setModifiedImage] = useState('');
    const [color, setColor] = useState({
        name: '',
        hex: '',
        rgb: '',
        label: '',
    });
    const [labelIndex, setLabelIndex] = useState(0);

    const [colorGroups, setColorGroups] = useState({}); // State to store color groups

    useEffect(() => {
        // Initialize color groups when labels change
        setColorGroups(groupIndex(labels));
    }, [labels]);

    const groupIndex = (labels) => {
        const colorGroups = {};
        Object.keys(labels).forEach((key) => {
            const label = labels[key];
            if (!colorGroups[label]) {
                colorGroups[label] = [];
            }
            colorGroups[label].push(parseInt(key));
        });
        return colorGroups;
    };

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
    };

    const handleImageClick = (e) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = imageRef.current.width;
        canvas.height = imageRef.current.height;

        ctx.drawImage(imageRef.current, 0, 0, canvas.width, canvas.height);

        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;
        const colorIndex = getColorIndex(e);
        setLabelIndex(colorIndex);
        
        const selectedGroup = colorGroups[colorIndex];

        for (let i = 0; i < pixels.length; i += 4) {
            const dataIndex = i / 4;
            if (!selectedGroup.includes(dataIndex)) {
                pixels[i + 3] = pixels[i + 3] * 0.1;
            }
        }

        ctx.putImageData(imgData, 0, 0);

        findColorName(pixels, color_dict[colorIndex]);

        const modifiedImageURL = canvas.toDataURL(); // Convert canvas to base64 URL

        setModifiedImage(modifiedImageURL);
        setIsModified(true);
    };
    
    const hightlightClicked = () => {

    }

    return (
        <div
            style={{
                margin: '2rem',
                width: '100%',
                display: 'flex',
                justifyContent: 'space-evenly',
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ maxHeight: '50rem' }}>
                    {file && 
                    <Image
                        src={
                            isModified
                                ? modifiedImage
                                : URL.createObjectURL(file)
                        }
                        ref={imageRef}
                        alt="Image"
                        fluid
                        onClick={isModified ? null : handleImageClick}
                        style={{ maxHeight: '50rem' }}
                    />
                }
                </div>
            </div>
            <div>
                {labels?.length !== 0 &&
                    <ColorInfo color={color} />
                }

                <div style={{ marginTop: '2rem' }}>
                    <h5>Color Highlight</h5>
                    <div
                        style={{
                            height: '1px',
                            width: '100%',
                            backgroundColor: 'black',
                        }}
                    ></div>
                    <div style={{ margin: '1rem auto 0.5rem auto' }}>
                        Choose a Color
                    </div>
                    <Form.Select
                        aria-label="Default select example"
                        style={{ marginTop: '1rem' }}
                        value={labelIndex}
                        onChange={(e) => {setLabelIndex(e.target.value)}}
                    >
                        {Object.keys(color_dict).map((i, idx) => <option value={i} key={idx} >{color_dict[i]}</option>)}
                    </Form.Select>
                    <Button
                        style={{
                            margin: '1rem',
                            border: 'none'
                        }}
                        onClick={() => setIsModified(false)}
                    >
                        HIGHLIGHT
                    </Button>
                    <Button
                        style={{
                            margin: '1rem auto',
                            border: 'none'
                        }}
                        onClick={() => setIsModified(false)}
                    >
                        RESET
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Integration;
