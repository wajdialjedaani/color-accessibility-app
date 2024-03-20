import React, { useState, useEffect, useRef } from "react";
import { generatePalette } from "../api/palette/generatePalette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faCopy } from "@fortawesome/free-solid-svg-icons";
import { Button, Form } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

  const handleColorChange = (e, index) => {
    const manualColors = [...colors];
    const hex = e.target.value;
    const rgb = hexToRgb(hex);
    if (rgb) {
      manualColors[index] = { rgb: [rgb.r, rgb.g, rgb.b], isLocked: false };
      setColors(manualColors);
    }
  };

  const handleDownload = () => {
    const palette = document.getElementById('palette');

    html2canvas(palette, {scale: 3})
      .then((canvas) => {
        const pdf = new jsPDF('l', 'px', [palette.offsetWidth * 2, palette.offsetHeight * 2]);
        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.addImage(imgData, 'JPEG', 0, 0);
        if (flag && colorType != '') {
          pdf.addPage();
          const newPalette = document.getElementById('newPalette');
          html2canvas(newPalette, { scale: 3 })
            .then((newCanvas) => {
              const newImgData = newCanvas.toDataURL('image/jpeg', 1.0);
              const pdfName = `palette_${colorType.toLowerCase()}.pdf`; 
              pdf.addImage(newImgData, 'JPEG', 0, 0);
              pdf.save(pdfName);
            });
        } else {
          pdf.save('palette.pdf');
        }
      })
  }
  
  const hexToRgb = (hex) => {
    hex = hex.replace(/^#/, '');
    // Convert hex to RGB
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
  };

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

  const getContrastRatio = (color) => {
    const luminance = (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
  };

  useEffect(() => {
    if (colors?.length === 0 && typeof window !== "undefined") {
      handleGeneratePalette();
    }
  }, [colors]);

  return (
    <div style={{marginBottom: '3rem'}} className="d-flex flex-column">
          {/* Header and Description */}
      <div style={{margin: '2rem'}}>
        <h3> Color Palette Generator</h3>
        <p>
          Welcome to our Color Palette Generator—a hub for unleashing your creative vision! 
          Craft unique color schemes effortlessly with our user-friendly tool. <br></br><br></br>
          <b>Simply generate a random palette or choose a color by selecting a color from the picker and click the lock icon to toggle locking the color. 
          <br></br>
          Additionally, there's an option to export your favourite palette to a PDF for future reference.</b>
        </p>
        <div style={{ marginTop: '0.2rem' }}>
        <h5>Colorblind Perspective</h5>
        <p>
          Experience color palettes through the eyes of colorblind individuals. 
          Select a colorblindness type and click "GENERATE" to generate a palette 
          that caters to the unique vision of individuals with color vision deficiencies.
          The second palette depicts how a colorblind individual would see. Choose <b>None</b> for random palette.
        </p>
        <h5 style={{marginTop: '1rem'}}>Understanding Contrast for Readability</h5>
        <p>
        The contrast between text and background colors significantly influences readability, particularly for users with visual impairments. 
        Our generator automatically determines whether 
        to display text in black or white based on the contrast between the background and text colors.
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
      <div style={{display: 'flex', justifyContent: 'space-between'}}>

      <strong style={{margin: '0 2rem', display: 'flex', alignItems: 'center'}}> Normal Vision </strong>
      <Button
        style={{ padding: '5px 10px', borderColor: '#bab8b8', color: '#000000' ,backgroundColor: '#ffffff', margin: "0.5rem 2rem" }}
        onClick={handleDownload}      
      >
        Download
      </Button>
    </div>
      <div
        className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
        style={{ minHeight: "200px", margin: "0.1rem 2rem" }}
        id="palette"
      >
        {colors?.map((color, index) => (
          <div
            className="d-flex flex-column justify-content-center align-items-center align-content-end"
            key={index}
            style={{ width: "100%", position: "relative" }}
          >
            <div
              className=".flex-{grow|shrink}-1 d-flex flex-column justify-content-strech align-items-center"
              style={{
                backgroundColor: `rgb(${color.rgb.join(",")})`,
                border: color.isLocked ? "2px solid #000" : "none",
                margin: "0",
                width: "100%",
                height: "150px",
                textAlign: "center",
                color: getContrastRatio(color.rgb),
              }}
            >
              <span style={{ marginTop: '7rem', fontSize: '12px' }}>Contrast <br></br>
                <span style={{ borderTop: '1px solid', fontSize: '12px' }}>{getContrastRatio(color.rgb) === '#000000' ? 'Black Text' : 'White Text'}</span>
              </span>
            </div>
            <div style={{marginTop: '10px'}} className="d-flex justify-content-center align-items-center">
              <input 
                style={{ marginRight: "10px" }} 
                type="color" 
                className="m-auto form-control form-control-color"  
                value={rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])} 
                onChange={(e) => handleColorChange(e, index)}/> 
              <label style={{ paddingLeft: "8px" }}>
                {rgbToHex(color.rgb[0], color.rgb[1], color.rgb[2])}
              </label>
              <button
                type="button"
                className="btn"
                onClick={() => handleLockColor(index)}
                style={{ marginRight: "10px" }}
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
                style={{marginRight: "30px", marginLeft: "-20px"}}
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
      <div>
        <strong style={{margin: '2rem 0 0 2rem', display: 'flex', alignItems: 'center'}}>{colorType} Vision</strong>
      <div
        className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
        style={{ minHeight: "200px", margin: "0.3rem 2rem" }}
        id="newPalette"
      > 
        {newColors?.map((color, index) => (
          <div
            className="d-flex flex-column justify-content-center align-items-center align-content-end"
            key={index}
            style={{ width: "100%", position: "relative" }}
          >
            <div
              className=".flex-{grow|shrink}-1 d-flex flex-column justify-content-strech align-items-center"
              style={{
                backgroundColor: `rgb(${color.rgb.join(",")})`,
                border: color.isLocked ? "2px solid #000" : "none",
                margin: "0",
                width: "100%",
                height: "150px",
                textAlign: "center",
                color: getContrastRatio(color.rgb),
              }}
            >
              <span style={{ marginTop: '7rem', fontSize: '12px' }}>Contrast <br></br>
                <span style={{ borderTop: '1px solid', fontSize: '12px' }}>{getContrastRatio(color.rgb) === '#000000' ? 'Black Text' : 'White Text'}</span>
              </span>
            </div>
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
