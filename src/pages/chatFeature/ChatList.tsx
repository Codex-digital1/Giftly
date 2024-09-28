import { useEffect, useRef } from 'react';
import './style.css'
const ChatLists = ({ chats }) => {
    const endOfMessages = useRef();
    const user = localStorage.getItem('user');

    function SenderChat({ message, userName, profileImage }) {
        return (
            <div className='chat_sender'>
                <img src={profileImage} alt="" />
                <p>
                    <strong>{userName} </strong> <br />
                    {message}
                </p>
            </div>
        );
    }
    

    function ReceiverChat({ message, userName, profileImage }) {
        return (
            <div className='chat_receiver'>
                <img src={profileImage} alt="" />
                <p>
                    <strong>{userName}</strong> <br />
                    {message}
                </p>
            </div>
        );
    }

    useEffect(() => {
        scrollToBottom();
    }, [chats]);

    const scrollToBottom = () => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='overflow-y-scroll'>
            {chats?.map((chat, index) => {
                if (chat.senderUsername === user) {
                    return (
                        <SenderChat
                            key={index}
                            message={chat.message}
                            userName={chat.senderUsername}
                            profileImage={chat.profileImage}
                        />
                    );
                } else {
                    return (
                        <ReceiverChat
                            key={index}
                            message={chat.message}
                            userName={chat.senderUsername}
                            profileImage={chat.profileImage}
                        />
                    );
                }
            })}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatLists;