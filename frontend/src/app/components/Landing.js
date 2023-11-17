'use client';

import { Button, Form } from 'react-bootstrap';
import React, { useState } from 'react';
import { baseUrl } from '../constants';
import axios from 'axios'
import { responsivePropType } from 'react-bootstrap/esm/createUtilityClasses';

export default function Landing({ sendPhase }) {

    /*
    const [files, setFiles] = useState()
    const [isLoading, setIsLoading] = useState(false);
    const [image, setImage] = useState(null);

    const handleUpload = (files) => {
        setIsLoading(true);
        setFiles(files);
        setImage(null);
        console.log(files)

    }



    const sendData = () => {
        

        setIsLoading(true);

        const formData = new FormData();
        formData.append('image', files);

        axios.post(`${baseUrl}files/`, formData, {
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
        })
        .then((response) => {
            console.log(response)
        })
        .catch((err) => console.log(err));
    }
    */


    
    const [image, setImage] = useState(null);
    const [files, setFiles] = useState(null);

    const [fileTest, setFileTest] = useState(null);

    const handleChange = (e) => {
        console.log(e.target.files);
        const file = e.target.files[0];
        setImage(file);
        setFiles(null);

        setFileTest({ name: file.name, type: file.type });
    };

    const handleUpload = () => {
        if (image) {
            console.log('Uploading file:', image);
        } else {
            console.log('Please select a file');
        }

        const formData = new FormData();
        formData.append('image', image);

        axios.post(`${baseUrl}files/`, formData, {
            headers: {
                accept: 'application/json',
                'content-type': 'multipart/form-data'
            },
        })
        .then((response) => {
            console.log(response)
            console.log(JSON.parse(response.data.label))
            getResult(response);
        })
        .catch((err) => console.log(err));

        const getResult = (obj) => {
            axios.get(`${baseUrl}files/${obj.data.id}/`, {
                headers: {
                    accept: 'application/json',
                }
            })
            .then((response) => {
                setImage(response)
                console.log(response)
            })
            .catch((err) => console.log(err));
        }

        sendPhase({
            phase: 'integration',
            file: image,
        });
    };

    return (
        <div>
            <div className="box">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />
            </div>
            <Button
                className="upload"
                style={{ backgroundColor: '#39545B' }}
                onClick={handleUpload}
            >
                GENERATE
            </Button>
        </div>
    );
}
