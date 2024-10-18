import { useEffect, useRef } from 'react';
import './style.css';

interface Chat {
    message: string;
    senderUsername: string;
    profileImage: string | undefined;
    image?: string | null;
}

interface ChatListsProps {
    chats: Chat[];
    sender: string | null | undefined;
}

const ChatLists: React.FC<ChatListsProps> = ({ chats, sender }) => {
    const endOfMessages = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const truncateWords = (message: string) => {
        return message.split(' ').map(word => {
            return word.length > 15 ? `${word.slice(0, 20)}...` : word;
        }).join(' ');
    };

    const SenderChat: React.FC<Chat> = ({ message, senderUsername, profileImage, image }) => {
        const truncatedMessage = truncateWords(message);

        return (
            <div className="flex justify-end m-4">
                
                <div className="chat chat-end max-w-xs  text-slate-800">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="sender Image"
                                src={profileImage} />
                        </div>
                    </div>
                    <div className="chat-header font-bold text-slate-800">
                        {senderUsername}
                    </div>
                    <div className="chat-bubble chat-bubble-error bg-gradient-to-t from-[#ff4d6d]  to-[#E4003A] shadow-lg">
                        {image && (
                            <img
                                src={image}
                                alt="Received"
                                className="max-h-[150px] max-w-xs w-full object-cover rounded-sm my-3"
                            />
                        )}
                        <p className="text-white whitespace-normal">
                            {truncatedMessage}
                        </p>
                    </div>

                </div>
            </div>
        );
    };

    const ReceiverChat: React.FC<Chat> = ({ message, senderUsername, profileImage, image }) => {
        const truncatedMessage = truncateWords(message); // Apply truncation logic

        return (
            <div className="flex justify-start m-4 ">
                
                <div className="chat chat-start max-w-xs text-slate-800 ">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="receiver Image"
                                src={profileImage} />
                        </div>
                    </div>
                    <div className="chat-header font-bold text-slate-800">
                        {senderUsername}
                    </div>
                    <div className="chat-bubble bg-gray-200 shadow-lg">
                        {image && (
                            <img
                                src={image}
                                alt="Received"
                                className="max-h-[150px]  max-w-xs w-full object-cover rounded-sm my-3"
                            />
                        )}
                        <p className=' text-slate-800 whitespace-normal'>
                            {truncatedMessage}
                        </p>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="overflow-y-scroll scrollbar-none flex flex-col h-full">
            {chats?.map((chat, index) => {
                if (chat.senderUsername === sender) {
                    return (
                        <SenderChat
                            key={index}
                            message={chat.message}
                            senderUsername={chat.senderUsername}
                            profileImage={chat.profileImage}
                            image={chat.image}
                        />
                    );
                } else {
                    return (
                        <ReceiverChat
                            key={index}
                            message={chat.message}
                            senderUsername={chat.senderUsername}
                            profileImage={chat.profileImage}
                            image={chat.image}
                        />
                    );
                }
            })}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatLists;
