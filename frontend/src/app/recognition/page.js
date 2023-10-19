'use client'

import { Button } from "react-bootstrap";
import React, { useState } from 'react';


export default function Page() {
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(...selectedFile, file);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
    } else {
      console.log('Please select a file');
    }
  }
  return (
    <div>
    <div className="box">
        <input
        style={{margin: '30% 30%'}}
        type="file"
        accept="image/*"
        onChange={handleChange} />
    </div>
    <Button className="upload" style={{ backgroundColor: "#39545B" }} onClick={handleUpload}>
        GENERATE
    </Button>
    </div>
  )
}