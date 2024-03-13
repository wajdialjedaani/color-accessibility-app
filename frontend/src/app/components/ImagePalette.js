// frontend/src/components/Palette.js
import React, { useState } from "react";
import { Button, Image, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { LoadingState } from "./LoadingState";
import { findSignificantColors } from "../api/palette/findSignificantColors";

const ImagePalette = () => {
  const [colors, setColors] = useState([{ rgb: [256, 256, 256] }]);
  const [image, setImage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);
  const [fileChosen, setFileChosen] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileChosen(true);
  };

  const handleUpload = () => {
    if (!fileChosen) {
      alert('Please choose a file before proceeding.');
      return;
  }
    setIsLoad(true);
    setIsClicked(true);
    findSignificantColors(image).then((res) => {
      setIsLoad(false);
      setColors(
        res.map((i) => {
          return { rgb: i };
        })
      );
    });
  };

  const handleClearImage = () => {
    setImage(null);
    setIsClicked(false);
    setColors([{ rgb: [256, 256, 256] }]);
  };

  const getContrastRatio = (color) => {
    const luminance = (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114) / 255;
    return luminance > 0.5 ? '#000000' : '#ffffff';
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

  return (
    <div className="d-flex flex-column" style={{ margin: "2rem" }}>
       <h3> Color Palette Generator From Image</h3>
       <div style={{ marginTop: '1rem' }}>
        <h5>Elevate your Creativity in 3 Simple Steps:</h5>
        <ul>
          <li>
            Upload Image: Select any image—photo, graphic, or artwork—and upload
            it with a click.
          </li>

          <li>
            Wait a Moment: Our smart system analyzes your image, revealing the
            five most significant colors.
          </li>

          <li>
            Discover Your Palette: Instantly explore a curated color palette
            inspired by your image. Ready to inspire your next project!
          </li>
        </ul>
      </div>
      <div style={{ marginTop: '1rem'}}>
        <h5>Choose an Image</h5>
        <div>
        <input
            type="file"
            accept="image/*"
            onChange={handleChange}  
        />
        </div>
        <Button
        style={{ border: 'none', backgroundColor: '#39545B', margin: "1rem auto" }}
        onClick={handleUpload}
        >
            GENERATE
        </Button>
        <Button
            style={{
                border: 'none',
                backgroundColor: '#39545B',
                margin: '1rem auto',
                marginLeft: '0.5rem',
            }}
            onClick={handleClearImage}
        >
            RESET
        </Button>
      </div>

      {isLoad && (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999, 
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem',
                    color: 'white',
                }}
            >
                <Spinner animation="border" variant="light" />
                <span>Processing...</span>
            </div>
        </div>
    )}
        {/* Palette Display */}
      {image !== null && isClicked &&
      <div>
      <div className="d-flex justify-content-end">
      <Button
      style={{ padding: '5px 10px', borderColor: '#bab8b8', color: '#000000' ,backgroundColor: '#ffffff' }}
    >
      Download
    </Button>
      </div>
      <div className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
         style={{ minHeight: "200px", marginTop: "0.5rem" }}>
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
        <div style={{marginTop: "1rem"}}> 
          {image ? (
            <div className="d-flex justify-content-center">
              <Image
                className=".flex-{grow|shrink}-1"
                src={URL.createObjectURL(image)}
                alt="Image"
                fluid
                style={{ maxHeight: "40rem" }}
              />
            </div>
          ) : ""}{" "}
        </div>
    </div>
  );
};

export default ImagePalette;
