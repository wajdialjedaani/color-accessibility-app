import React, { useState } from 'react';
import { sendMessage } from '../../utils/sendMessage';

function Chatbox() {
  const [content, setContent] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (message.trim() === '') return;
      setContent([...content, { role: 'user', content: message }]);
      setMessage('');
    try {
      const  data  = await sendMessage(message);
      console.log(data);
  
      setContent((prevContent) => [...prevContent, data]);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className="chatbox">
      <div className="chatbox-messages">
        {content.map((chat, index) => (
          <div key={index} className={`message ${chat.role}`}>
            {chat.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbox;
