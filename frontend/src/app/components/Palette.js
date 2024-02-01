// frontend/src/components/Palette.js
import React, { useState, useEffect } from 'react';

const Palette = () => {
  const [colors, setColors] = useState([]);
  const [lockedColors, setLockedColors] = useState(Array(5).fill(false));

  function generateRandomColor() {
    return [
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
      Math.floor(Math.random() * 256),
    ];
  }

  function generateRandomPalette() {
    const palette = [];
    for (let i = 0; i < 5; i++) {
      palette.push(generateRandomColor());
    }
    return palette;
  }

  const handleGeneratePalette = () => {
    const newPalette = colors.map((color, index) => {
      return lockedColors[index] ? color : generateRandomColor();
    });
    setColors(newPalette);
  };

  const handleLockColor = (index) => {
    const updatedLockedColors = [...lockedColors];
    updatedLockedColors[index] = !updatedLockedColors[index];
    setLockedColors(updatedLockedColors);
  };

  useEffect(() => {
    // Generate the initial palette on the client side
    if (colors.length === 0 && typeof window !== 'undefined') {
      setColors(generateRandomPalette());
    }
  }, [colors]);

  useEffect(() => {
    // Ensure hydration is triggered after the initial render
    handleGeneratePalette();
  }, []); // Run only once when the component mounts

  return (
    <div class="d-flex flex-column">
      <h1>Color Palette Generator</h1>
      <div class="d-flex flex-row justify-content-between align-items-strech .flex-{grow|shrink}-1" style={{ minHeight: '400px' }} >
        {colors.map((color, index) => (
          <div class="d-flex flex-column justify-content-center align-items-center align-content-end" key={index} style={{ width: '100%', position: 'relative' }} >
            <div class=".flex-{grow|shrink}-1 d-flex justify-content-strech align-items-center"
              style={{
                backgroundColor: `rgb(${color.join(',')})`,
                border: lockedColors[index] ? '2px solid #000' : 'none',
                margin: '0',
                width: '100%',
                height: '150px'
              }}
            >
            </div>
            <label>{color.join(',')}</label>
            <button type="button" class="btn btn-secondary" onClick={() => handleLockColor(index)}>
              {lockedColors[index] ? 'Unlock' : 'Lock'}
            </button>
          </div>
        ))}
      </div>
      <div class="d-flex justify-content-center">
      <div class="d-flex justify-content-around" style={{gap: '36px'}}>
        <button class="btn btn-primary btn-lg" type="submit" onClick={handleGeneratePalette}>Generate Palette</button>
        <button class="btn btn-primary btn-lg" type="submit">Download</button>
      </div>
      </div>
    </div>
  );
};

export default Palette;


