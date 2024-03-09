// frontend/src/components/Palette.js
import React, { useState, useEffect } from "react";
import { generatePalette } from "../api/palette/generatePalette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from 'react-bootstrap';

const Palette = () => {
  const [colors, setColors] = useState([]);
  const [newColors, setNewColors] = useState([]);
  const [colorType, setColorType] = useState('');
  const [flag, setFlag] = useState(false);

  const handleGeneratePalette = () => {
    generatePalette((palette, newPalette) => {
      setColors(palette);
      setNewColors(newPalette);
      setFlag(true);
    }, colors, colorType);
  };

  const handleLockColor = (index) => {
    const palette = [...colors];
    palette[index].isLocked = !palette[index].isLocked;

    setColors(palette);
  };
  
  const handleChangeType = (event) => {
    setColorType(event.target.value);
    setFlag(false);
  }

  const rgbToHex = (red, green, blue) => {
    const toHex = (value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };

    const hexRed = toHex(red);
    const hexGreen = toHex(green);
    const hexBlue = toHex(blue);

    return `#${hexRed}${hexGreen}${hexBlue}`.toUpperCase();
  };

  useEffect(() => {
    if (colors?.length === 0 && typeof window !== "undefined") {
      handleGeneratePalette();
    }
  }, [colors]);

  return (
    <div className="d-flex flex-column">
          {/* Header and Description */}
      <div style={{margin: '2rem'}}>
        <h3> Color Palette Generator</h3>
        <p>
          Welcome to our Color Palette Generator—a hub for unleashing your creative vision! 
          Craft unique color schemes effortlessly with our user-friendly tool. 
        </p>
        <div style={{ marginTop: '0.2rem' }}>
        <h5>Colorblind Perspective</h5>
        <p>
          Experience color palettes through the eyes of colorblind individuals. 
          Select a colorblindness type and click "GENERATE" to generate a palette 
          that caters to the unique vision of individuals with color vision deficiencies.
          The second palette depicts how a colorblind individual would see. Choose <b>None</b> for random palette.
        </p>
      </div>
          {/* Choose Type and Generate */}
        <h5 style={{marginTop: '1rem'}}>Choose Colorblindness Type</h5>
        <div style={{display: 'flex'}}>
        <Form.Select
        required 
        value={colorType} 
        aria-label="Default select example" 
        onChange={handleChangeType} 
        style={{marginTop: '0.5rem', height: '100%', width: '20%'}} >
            <option value=''>None</option>
            <option value="Protanopia">Protanopia (red-blind)</option>
            <option value="Deuteranopia">Deuteranopia (green-blind)</option>
            <option value="Tritanopia">Tritanopia (blue-blind)</option>
            <option value="Achromatopsia">Achromatopsia (monochromacy)</option>
        </Form.Select>
        <Button
        style={{ padding: '7px 15px', border: 'none', backgroundColor: '#39545B', margin: "0.5rem 0.5rem" }}
        onClick={handleGeneratePalette}
        >
            GENERATE
        </Button>
        </div>
      </div>
        {/* Random Palette Display */}
        <div className="d-flex justify-content-end">
      <Button
        style={{ padding: '5px 10px', borderColor: '#bab8b8', color: '#000000' ,backgroundColor: '#ffffff', margin: "0.5rem 2rem" }}
      >
        Download
      </Button>
    </div>
      <div
        className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
        style={{ minHeight: "200px", margin: "0.1rem 2rem" }}
      >
        {colors?.map((color, index) => (
          <div
            className="d-flex flex-column justify-content-center align-items-center align-content-end"
            key={index}
            style={{ width: "100%", position: "relative" }}
          >
            <div
              className=".flex-{grow|shrink}-1 d-flex justify-content-strech align-items-center"
              style={{
                backgroundColor: `rgb(${color.rgb.join(",")})`,
                border: color.isLocked ? "2px solid #000" : "none",
                margin: "0",
                width: "100%",
                height: "150px",
              }}
            ></div>
            <div>
              <label style={{ paddingTop: "10px" }}>
                {rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])}
              </label>
              <button
                type="button"
                className="btn"
                onClick={() => handleLockColor(index)}
              >
                {!color.isLocked ? (
                  <FontAwesomeIcon icon={faLockOpen} />
                ) : (
                  <FontAwesomeIcon icon={faLock} />
                )}
              </button>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])}`
                  )
                }
              >
                <FontAwesomeIcon icon={faCopy} />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
        {/* Colorblind Palette Display */}
      {flag && colorType != '' &&
      <div style={{marginTop: "2rem"}}>
        <div className="d-flex justify-content-end">
        <Button
        style={{ padding: '5px 10px', borderColor: '#bab8b8', color: '#000000' ,backgroundColor: '#ffffff', margin: "0.3rem 2rem" }}
      >
        Download
      </Button>
        </div>
      <div
        className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
        style={{ minHeight: "200px", margin: "0.5rem 2rem" }}
      > 
        {newColors?.map((color, index) => (
          <div
            className="d-flex flex-column justify-content-center align-items-center align-content-end"
            key={index}
            style={{ width: "100%", position: "relative" }}
          >
            <div
              className=".flex-{grow|shrink}-1 d-flex justify-content-strech align-items-center"
              style={{
                backgroundColor: `rgb(${color.rgb.join(",")})`,
                border: color.isLocked ? "2px solid #000" : "none",
                margin: "0",
                width: "100%",
                height: "150px",
              }}
            ></div>
            <div>
              <label style={{ paddingTop: "10px" }}>
                {rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])}
              </label>
              <button
                type="button"
                className="btn"
                onClick={() =>
                  navigator.clipboard.writeText(
                    `${rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])}`
                  )
                }
              >
                <FontAwesomeIcon icon={faCopy} />{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
      </div>
      }
    </div>
  );
};

export default Palette;
