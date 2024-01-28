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
    <div>
      <h1>Color Palette Generator</h1>
      <div>
        {colors.map((color, index) => (
          <div key={index} style={{ margin: '10px' }}> 
            <div
              style={{
                backgroundColor: `rgb(${color.join(',')})`,
                padding: '20px',
                border: lockedColors[index] ? '2px solid #000' : 'none',
              }}
            >
              {color.join(', ')}
            </div>
            <button onClick={() => handleLockColor(index)}>
              {lockedColors[index] ? 'Unlock' : 'Lock'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleGeneratePalette}>Generate Palette</button>
    </div>
  );
};

export default Palette;


