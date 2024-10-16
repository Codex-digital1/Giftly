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
                <div className="bg-primary text-white p-3 rounded-lg max-w-sm shadow-lg flex flex-col">
                    {image && (
                        <img
                            src={image}
                            alt="Received"
                            className="h-[100px] w-full object-cover rounded-sm my-3"
                        />
                    )}
                    <p className='font-medium text-end overflow-wrap-break-word word-break-break-word whitespace-normal my-3'>
                        {truncatedMessage}
                    </p>
                    <div className='flex justify-start gap-4 flex-row-reverse'>
                        <img
                            src={profileImage}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full object-cover"
                        />
                        <strong>{senderUsername}</strong> <br />
                    </div>
                </div>
            </div>
        );
    };

    const ReceiverChat: React.FC<Chat> = ({ message, senderUsername, profileImage, image }) => {
        const truncatedMessage = truncateWords(message); // Apply truncation logic

        return (
            <div className="flex justify-start m-4">
                <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs shadow-lg flex flex-col">
                    <div className='flex gap-4'>
                        <img
                            src={profileImage}
                            alt=""
                            className="w-[30px] h-[30px] rounded-full object-cover bg-center mb-2"
                        />
                        <strong className='mt-1'>{senderUsername}</strong> <br />
                    </div>
                    {image && (
                        <img
                            src={image}
                            alt="Received"
                            className="h-[100px] w-full object-cover rounded-sm my-3"
                        />
                    )}
                    <p className='font-medium overflow-wrap-break-word word-break-break-word whitespace-normal'>
                        {truncatedMessage}
                    </p>
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
