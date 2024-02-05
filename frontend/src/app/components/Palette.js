// frontend/src/components/Palette.js
import React, { useState, useEffect } from "react";
import { generatePalette } from "../api/palette/generatePalette";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faLockOpen, faCopy } from "@fortawesome/free-solid-svg-icons";

const Palette = () => {
  const [colors, setColors] = useState([]);

  const handleGeneratePalette = () => {
    generatePalette((palette) => {
      setColors(palette);
    }, colors);
  };

  const handleLockColor = (index) => {
    const palette = [...colors];
    palette[index].isLocked = !palette[index].isLocked;

    setColors(palette);
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

  useEffect(() => {
    if (colors?.length === 0 && typeof window !== "undefined") {
      handleGeneratePalette();
    }
  }, [colors]);
  return (
    <div className="d-flex flex-column" style={{ margin: "1rem" }}>
      <h2>Color Palette Generator</h2>
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
      <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-around" style={{ gap: "36px" }}>
          <button
            className="btn"
            style={{
              background: "#39545B",
              padding: "16px 48px",
              color: "white",
            }}
            type="submit"
            onClick={handleGeneratePalette}
          >
            GENERATE
          </button>
          <button
            className="btn"
            style={{
              background: "#E0835A",
              padding: "16px 48px",
              color: "white",
            }}
            type="submit"
          >
            DOWNLOAD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Palette;
