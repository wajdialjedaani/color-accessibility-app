'use client'

import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import ChatBox from './ChatBox';
import logo from '../public/logo.png'
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment} from '@fortawesome/free-solid-svg-icons'

function Chat() {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <Container className="fixed-bottom d-flex flex-column align-items-end">
        <Toast show={show} className="" style={{ backgroundColor: 'transparent' }}>
          <ChatBox />
        </Toast>
        <FontAwesomeIcon 
        onClick={toggleShow} 
        src={logo} alt="Chat Icon"  
        icon={faComment} size="2xl" 
        style={{color: "#f4ac10", marginBottom: "1rem", cursor: "pointer"}} />
    </Container>
  );
}


export default Chat;

