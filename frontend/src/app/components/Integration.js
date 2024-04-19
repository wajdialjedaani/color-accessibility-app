// import pic from '../public/example.png';
import React, { useRef, useState, useEffect } from 'react';
import ColorInfo from './ColorInfo';
import { Image, Form, Button } from 'react-bootstrap';
import { color_dict } from '../constants';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Card from 'react-bootstrap/Card';

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
    const [flag, setFlag] = useState(false);

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

    const highlightClicked = () => {
        setImgSource(colorGroups[labelIndex].url);
        setIsModified(true);
    };

    const analyzeClicked = () => {
        setFlag(!flag);
    }

    const calculatePercentage = (labelIndex) => {
        if (imgData) {
            const totalPixels = imgData.length / 4; // Divide by 4 because each pixel occupies 4 bytes (RGBA)
            const pixelsCount = colorGroups[labelIndex].pixels.length;
            return ((pixelsCount / totalPixels) * 100).toFixed(2);
        } else {
            return 0; // Return 0 if imgData is not yet available
        }
    };

    const sortedColorGroups = colorGroups.slice().sort((a, b) => {
        const percentageA = calculatePercentage(a.index);
        const percentageB = calculatePercentage(b.index);
        return percentageB - percentageA;
    });


    return (
    <div>
        {labels?.length !== 0 &&
        <div style={{ margin: '-1rem -1rem 0' }}>
            <Button
                style={{
                    border: 'none',
                    backgroundColor: '#7a765e',
                    margin: '1rem',
                }}
                onClick={analyzeClicked}
            >
                {flag === true ? 'COLOR INFO' : 'ANALYZE'}
            </Button>
        </div>
        }
        <div
            style={{
                margin: '2rem',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gridGap: '2rem',
            }}
        >
            <div>
                <div style={{ textAlign: 'center', maxHeight: '50rem' }}>
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
                {labels?.length !== 0 && !flag && (
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
                                    backgroundColor: '#7a765e',
                                }}
                                onClick={highlightClicked}
                            >
                                HIGHLIGHT
                            </Button>
                            <Button
                                style={{
                                    margin: '1rem auto',
                                    border: 'none',
                                    backgroundColor: '#7a765e',
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
                {flag && (
                    <Card>
                        <Card.Header>Color Percentage</Card.Header>
                        <Card.Body>
                        {sortedColorGroups.map((group, index) => (
                            <div key={index} style={{ marginBottom: '0.5rem' }}>
                                <div>{color_dict[group.index]}</div>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <ProgressBar
                                        striped variant="success"
                                        now={calculatePercentage(group.index)}
                                        style={{ width: '80%' }}
                                    />
                                    <span style={{ marginLeft: '0.5rem' }}>
                                        {calculatePercentage(group.index)}%
                                    </span>
                                </div>
                            </div>
                        ))}
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    </div>
    );
};

export default Integration;
