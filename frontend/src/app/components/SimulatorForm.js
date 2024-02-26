import React from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const SimulatorForm = ({
  handleChange,
  handleUpload,
  handleChangeType,
  handleReset,
  simulateType,
}) => {
  return (
    <div>
    <div style={{marginLeft: '2rem', marginTop: '2rem'}}>
        <h5>Choose an Image</h5>
        
        <div>
        <input
            type="file"
            accept="image/*"
            onChange={handleChange}
            
        />
        </div>
        {/* {fileChosen || (
            <div style={{ marginTop: '1rem', color: 'red' }}>
                Please choose a file before proceeding.
            </div>
        )} */}
        <h5 style={{marginTop: '2rem'}}>Choose Colorblindness Type</h5>
        <Form.Select
        required 
        value={simulateType} 
        aria-label="Default select example" 
        onChange={handleChangeType} 
        style={{marginTop: '0.5rem', width: '30%'}} >
            <option>Select Type</option>
            <option value="Protanopia">Protanopia (red-blind)</option>
            <option value="Deuteranopia">Deuteranopia (green-blind)</option>
            <option value="Tritanopia">Tritanopia (blue-blind)</option>
            <option value="Achromatopsia">Achromatopsia (monochromacy)</option>
        </Form.Select>
        <Button
        style={{ border: 'none', backgroundColor: '#39545B', margin: "1rem auto" }}
        onClick={handleUpload}
        disabled={!simulateType}
        >
            SIMULATE
        </Button>
        <Button
            style={{
                border: 'none',
                backgroundColor: '#39545B',
                margin: '1rem auto',
                marginLeft: '0.5rem',
            }}
            onClick={handleReset}
        >
            RESET
        </Button>
    </div>

    </div>
  );
};

export default SimulatorForm;
