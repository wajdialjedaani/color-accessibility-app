// import pic from '../public/example.png';
import React, { useRef, useState, useEffect } from 'react';
import ColorInfo from './ColorInfo';
import { Image, Form, Button } from 'react-bootstrap';
import { color_dict } from '../constants';

const Integration = ({ setLoading, file, labels }) => {
    const imageRef = useRef(null);
    const [isModified, setIsModified] = useState(false);
    const [imgSource, setImgSource] = useState(URL.createObjectURL(file));
    const [imgData, setImgData] = useState();
    const [color, setColor] = useState({
        name: '',
        hex: '',
        rgb: '',
        label: '',
    });
    const [labelIndex, setLabelIndex] = useState(0);

    const [colorGroups, setColorGroups] = useState(
        Object.keys(color_dict).map((i) => ({
            index: parseInt(i),
            pixels: [],
            url: '',
        }))
    ); // { index: number; pixels: Array(number); url: string }

    useEffect(() => {
        setImgSource(URL.createObjectURL(file));
        setColorGroups(groupIndex(labels));

        console.log('Generating highlighted images...')
        if (
            imageRef.current &&
            imageRef.current.complete &&
            imageRef.current.naturalWidth !== 0
        ) {
            const updatedColorGroups = colorGroups.map((group) => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = imageRef.current.naturalWidth;
                canvas.height = imageRef.current.naturalHeight;

                ctx.drawImage(
                    imageRef.current,
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

                const imgData = ctx.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );
                const pixels = imgData.data;
                setImgData(pixels);
                const selectedGroup = group.pixels;

                for (let i = 0; i < pixels.length; i += 4) {
                    const dataIndex = i / 4;
                    if (!selectedGroup.includes(dataIndex)) {
                        pixels[i + 3] = pixels[i + 3] * 0.1;
                    }
                }

                ctx.putImageData(imgData, 0, 0);
                group.url = canvas.toDataURL();

                return group;
            });

            setColorGroups(updatedColorGroups);
            setLoading(false);
        }
    }, [labels]);

    const groupIndex = (labels) => {
        const groups = [...colorGroups];
        if (labels){
            Object.keys(labels).forEach((key) => {
                const label = labels[key];
                const g = groups.find((i) => i.index === parseInt(label));
                if (g) {
                    g.pixels.push(parseInt(key));
                }
            });
        }
        return groups;
    };

    const findColorName = async (input, label) => {
        const red = imgData[input * 4];
        const green = imgData[input * 4 + 1];
        const blue = imgData[input * 4 + 2];
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
        const imageElement = imageRef.current;
        const rect = imageElement?.getBoundingClientRect();

        const xRatio = (e.clientX - rect.left) / imageElement.width;
        const yRatio = (e.clientY - rect.top) / imageElement.height;

        const x = Math.floor(xRatio * imageElement.naturalWidth);
        const y = Math.floor(yRatio * imageElement.naturalHeight);

        const index = y * imageElement.naturalWidth + x;
        
        setLabelIndex(labels[index]);
        findColorName(index, color_dict[labels[index]]);
    };

    const hightlightClicked = () => {
        setImgSource(colorGroups[labelIndex].url);
        setIsModified(true);
    };

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
                    {file && (
                        <Image
                            src={imgSource}
                            ref={imageRef}
                            alt="Image"
                            fluid
                            onClick={isModified ? null : handleImageClick}
                            style={{ maxHeight: '50rem' }}
                        />
                    )}
                </div>
            </div>
            <div>
                {labels?.length !== 0 && (
                    <div>
                        <ColorInfo color={color} />

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
                                onChange={(e) => {
                                    setLabelIndex(e.target.value);
                                }}
                            >
                                {colorGroups.filter((i) => i.pixels.length > 0).map((i, idx) => (
                                    <option value={i.index} key={idx}>
                                        {color_dict[i.index]}
                                    </option>
                                ))}
                            </Form.Select>
                            <Button
                                style={{
                                    margin: '1rem',
                                    border: 'none',
                                }}
                                onClick={hightlightClicked}
                            >
                                HIGHLIGHT
                            </Button>
                            <Button
                                style={{
                                    margin: '1rem auto',
                                    border: 'none',
                                }}
                                onClick={() => {
                                    setIsModified(false),
                                        setImgSource(URL.createObjectURL(file));
                                }}
                            >
                                RESET
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Integration;
