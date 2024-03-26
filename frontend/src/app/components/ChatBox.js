import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Button} from 'react-bootstrap';

function Chatbox({onCloseClicked}) {
    const [content, setContent] = useState([]);
    const [message, setMessage] = useState('');
    const bottomRef = useRef(null);

    // define a function to scroll to the bottom
    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // call the function when the component is mounted or updated
    useEffect(() => {
        scrollToBottom();
    }, [content]);

    useEffect(() => {
        // Load conversation from local storage when the component mounts
        const savedContent = JSON.parse(localStorage.getItem('content'));

        if (savedContent) {
            setContent(savedContent);
        }
    }, []); // The empty dependency array ensures this effect only runs once when the component mounts.

    const handleChange = (e) => {
        setMessage(e.target.value);
    };

    const handleClear = () => {
        setContent([]);
        localStorage.clear();
    };

    const handleCloseClicked = () => {
        setShowChatbox(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        setContent([...content, { role: 'user', content: message }]);
        setMessage('');

        try {
            const response = await fetch('/api/createMessage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();

            setContent((prevContent) => [
                ...prevContent,
                data.choices[0].message,
            ]);

            // Save the updated conversation to local storage
            localStorage.setItem(
                'content',
                JSON.stringify([
                    ...content,
                    { role: 'user', content: message },
                    data.choices[0].message,
                ])
            );
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="chatbox rounded rounded-25">
            <div className="d-flex flex-row justify-content-between p-2 adiv text-white align-items-center">
            <span style={{fontSize: '15px'}}>Live chat</span>
                    <div className="d-flex"><Button className="flex-1" style={{ backgroundColor: 'orange', border: 'transparent' }} onClick={onCloseClicked}><FontAwesomeIcon icon={faXmark} /></Button></div>
            </div>   
            <div className="chatbox-messages p-2">        
            {content.map((chat, index) => (
                    <div key={index} className={`message ${chat.role}`}>
                        {chat.content}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>
            <form
                onSubmit={handleSubmit}
                className="parent-container d-flex w-100"
            >
                <input
                    className="form-control w-100 bg-light"
                    type="text"
                    value={message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                />

                <Button onClick={handleSubmit} variant="info">
                    <FontAwesomeIcon icon={faPaperPlane} size="lg" />
                </Button>
                <Button onClick={handleClear} variant="text">
                    Clear
                </Button>
            </form>
        </div>
    );
}

export default Chatbox;
