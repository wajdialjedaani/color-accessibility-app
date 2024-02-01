// frontend/src/components/Palette.js
import React, { useState, useEffect } from 'react';
import { generatePalette } from '../api/palette/route';

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

  useEffect(() => {
    if (colors?.length === 0 && typeof window !== 'undefined') {
      handleGeneratePalette();
    }
  }, [colors]);
  return (
    <div>
      <h1>Color Palette Generator</h1>
      <div>
        {colors?.map((color, index) => (
          <div key={index} style={{ margin: '10px' }}> 
            <div
              style={{
                backgroundColor: `rgb(${color.rgb.join(',')})`,
                padding: '20px',
                border: color.isLocked ? '2px solid #000' : 'none',
              }}
            >
              {color.rgb.join(', ')}
            </div>
            <button onClick={() => handleLockColor(index)}>
              {color.isLocked ? 'Unlock' : 'Lock'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleGeneratePalette}>Generate Palette</button>
    </div>
  );
};

export default Palette;


