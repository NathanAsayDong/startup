import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { MessageSender } from './messageSocket';
import './transactionChat.css';


export function TransactionChat() {
    const username = "test";

    const [messages, setMessages] = React.useState([]);
    const [message, setMessage] = useState([]);

    React.useEffect(() => {
        MessageSender.addHandler(handleMessageEvent);

        return () => {
            MessageSender.removeHandler(handleMessageEvent);
        };
    });

    function handleMessageEvent(event) {
        setMessages([...messages, event]);
    };


    const handleNewMessage = () => {
        MessageSender.sendMessage(message);
        setMessage('');
    };

    function createMessageArray() {
        const messageArray = [];
        for (const [i, message] of messages.entries()) {
            console.log('inside array loop')
            const new_message = `${message.sender}: ${message.message}`;
            messageArray.push(
                <div>
                    {new_message}
                </div>
            );
        }
        console.log(messageArray);
        return messageArray;
    }

    return (
        <>
            <div className='chat-container'>
                <h3>Transaction Chat</h3>
                <div>{createMessageArray()}</div>
                <div className='message-functionality'>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='Type message here...'
                    />
                    <Button variant="primary" size="md" onClick={handleNewMessage}>
                        Send Message
                    </Button>
                </div>
            </div>
        </>
    );
}

//reference
// import React from 'react';

// import { GameEvent, GameNotifier } from './gameNotifier';
// import './players.css';

// export function Players(props) {
//   const userName = props.userName;

//   const [events, setEvent] = React.useState([]);

//   React.useEffect(() => {
//     GameNotifier.addHandler(handleGameEvent);

//     return () => {
//       GameNotifier.removeHandler(handleGameEvent);
//     };
//   });

//   function handleGameEvent(event) {
//     setEvent([...events, event]);
//   }

//   function createMessageArray() {
//     const messageArray = [];
//     for (const [i, event] of events.entries()) {
//       let message = 'unknown';
//       if (event.type === GameEvent.End) {
//         message = `scored ${event.value.score}`;
//       } else if (event.type === GameEvent.Start) {
//         message = `started a new game`;
//       } else if (event.type === GameEvent.System) {
//         message = event.value.msg;
//       }

//       messageArray.push(
//         <div key={i} className='event'>
//           <span className={'player-event'}>{event.from.split('@')[0]}</span>
//           {message}
//         </div>
//       );
//     }
//     return messageArray;
//   }

//   return (
//     <div className='players'>
//       Player
//       <span className='player-name'>{userName}</span>
//       <div id='player-messages'>{createMessageArray()}</div>
//     </div>
//   );
// }
