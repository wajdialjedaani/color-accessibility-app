'use client'

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ChatBox from './ChatBox';
import logo from '../public/logo.png'
import Image from 'next/image';

function Chat() {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <Container className="fixed-bottom d-flex flex-column align-items-end">
        <Toast show={show} className="" style={{ backgroundColor: 'transparent' }}>
          <ChatBox />
        </Toast>
        <Image onClick={toggleShow} src={logo} alt="Chat Icon" width={80} height={50}/>
    </Container>
  );
}


export default Chat;

