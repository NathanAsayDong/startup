import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import './transactionChat.css';

export function TransactionChat() {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const initializeMessages = () => {
        setMessages([
            {
                "id": 1,
                "text": "Hello Nate",
                "createdAt": new Date(),
                "user": {
                    "id": 2,
                    "name": "React Native",
                    "avatar": "https://placeimg.com/140/140/any"
                }
            },
            {
                "id": 2,
                "text": "Hello Soph",
                "createdAt": new Date(),
                "user": {
                    "id": 1,
                    "name": "React Native",
                    "avatar": "https://placeimg.com/140/140/any"
                }
            }
        ])
    }

    useEffect(() => {
        initializeMessages();
    }, [])

    const handleNewMessage = () => {
        setMessages([...messages, {text: message}])
    }


    return (
        <>
            <div className='chat-container'>
            <h3>Transaction Chat</h3>
                {messages.map((message) => {
                    return (
                        <div className='message-container'>
                            <div className='message'>
                                <p>{message.text}</p>
                            </div>
                        </div>
                    )
                })}
                <div className='message-functionality'>
                    <input type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='type message here...'/>
                    <Button variant="primary" size="md" onClick={handleNewMessage}>Send Message</Button>
                </div>
            </div>

        </>
    )
}