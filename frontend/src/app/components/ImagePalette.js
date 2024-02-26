// frontend/src/components/Palette.js
import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { LoadingState } from "./LoadingState";
import { findSignificantColors } from "../api/palette/findSignificantColors";

const ImagePalette = () => {
  const [colors, setColors] = useState([{ rgb: [256, 256, 256] }]);
  const [image, setImage] = useState(null);
  const [isLoad, setIsLoad] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = () => {
    setIsLoad(true);

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
    setColors([{ rgb: [256, 256, 256] }]);
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
    <div className="d-flex flex-column" style={{ margin: "1rem" }}>
      <h2>Color Palette from Image</h2>
      <div
        className="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1"
        style={{ minHeight: "200px" }}
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
      <div>
        <Button style={{ backgroundColor: "#39545B" }} onClick={handleUpload}>
          GENERATE
        </Button>
        <Button style={{ marginLeft: "1rem" }} onClick={handleClearImage}>
          Clear
        </Button>
        <div style={{ position: "relative" }}>{isLoad && <LoadingState />}</div>
        <div className="box d-flex flex-row">
          {image ? (
            <div className="box d-flex flex-row" style={{ height: "20rem" }}>
              <Image
                src={URL.createObjectURL(image)}
                alt="Image"
                fluid
                style={{ maxHeight: "20rem" }}
              />
            </div>
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default ImagePalette;
