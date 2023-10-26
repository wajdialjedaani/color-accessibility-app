'use client'

import React, { useState } from 'react';
import { Container, Image } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ChatBox from './ChatBox';
import logo from '../../../public/next.svg'

function Chat() {
  const [show, setShow] = useState(true);

  const toggleShow = () => setShow(!show);

  return (
    <Container className="fixed-bottom p-3">
      <Toast show={show}>
        <ChatBox />
      </Toast>
      <Image onClick={toggleShow} src={logo} alt="Chat Icon" />
    </Container>
  );
}

export default Chat;

