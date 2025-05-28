import { useRef, memo, useEffect } from 'react';
import './style.css';

interface Chat {
    message: string;
    senderUsername: string;
    profileImage: string | undefined;
    image?: string | null;
    createdAt?: Date;
}

interface ChatListsProps {
    chats: Chat[];
    sender: string | null | undefined;
}

const formatTime = (dateString?: Date) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatLists: React.FC<ChatListsProps> = ({ chats, sender }) => {
    const endOfMessages = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chats]);

    const truncateMessage = (message: string) => {
        return message.length <= 200 ? message : `${message.slice(0, 200)}...`;
    };

    const SenderChat = memo(({ message, senderUsername, profileImage, image, createdAt }: Chat) => (
        <div className="flex justify-end m-4">
            <div className="chat chat-end max-w-xs text-slate-800">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt={`${senderUsername}'s profile`}
                            src={profileImage} 
                            aria-label="Sender profile image"
                        />
                    </div>
                </div>
                <div className="chat-header font-bold text-slate-800">
                    {senderUsername}
                </div>
                <div className="chat-bubble chat-bubble-error bg-gradient-to-t from-[#ff4d6d] to-[#E4003A] shadow-lg">
                    {image && (
                        <div className="relative group">
                            <img
                                src={image}
                                alt="Shared content"
                                className="max-h-[150px] max-w-xs w-full object-cover rounded-sm my-3
                                       transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                                        transition-all duration-300 rounded-sm" />
                        </div>
                    )}
                    <p className="text-white whitespace-normal">
                        {truncateMessage(message)}
                    </p>
                </div>
                <div className="chat-footer flex items-center gap-1 opacity-50 text-xs mt-1">
                    {formatTime(createdAt)}
                    <span className="text-xs" aria-label="Message status">✓✓</span>
                </div>
            </div>
        </div>
    ));

    const ReceiverChat = memo(({ message, senderUsername, profileImage, image, createdAt }: Chat) => (
        <div className="flex justify-start m-4">
            <div className="chat chat-start max-w-xs text-slate-800">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt={`${senderUsername}'s profile`}
                            src={profileImage}
                            aria-label="Receiver profile image"
                        />
                    </div>
                </div>
                <div className="chat-header font-bold text-slate-800">
                    {senderUsername}
                </div>
                <div className="chat-bubble bg-gray-200 shadow-lg">
                    {image && (
                        <div className="relative group">
                            <img
                                src={image}
                                alt="Shared content"
                                className="max-h-[150px] max-w-xs w-full object-cover rounded-sm my-3
                                       transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 
                                        transition-all duration-300 rounded-sm" />
                        </div>
                    )}
                    <p className='text-slate-800 whitespace-normal'>
                        {truncateMessage(message)}
                    </p>
                </div>
                <div className="chat-footer opacity-50 text-xs mt-1">
                    {formatTime(createdAt)}
                </div>
            </div>
        </div>
    ));

    return (
        <div 
            role="log"
            aria-live="polite"
            className="overflow-y-scroll scrollbar-none flex flex-col h-full"
        >
            {chats?.length === 0 && (
                <div className="flex-1 grid place-items-center text-gray-500">
                    No messages yet. Start the conversation!
                </div>
            )}

            {chats?.map((chat) => (
                chat.senderUsername === sender ? (
                    <SenderChat
                        key={`${chat.createdAt}-${chat.senderUsername}`}
                        {...chat}
                    />
                ) : (
                    <ReceiverChat
                        key={`${chat.createdAt}-${chat.senderUsername}`}
                        {...chat}
                    />
                )
            ))}
            
            <div ref={endOfMessages} aria-hidden="true" />
        </div>
    );
};

export default ChatLists;