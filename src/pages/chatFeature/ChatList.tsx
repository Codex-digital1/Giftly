import './style.css';

interface Chat {
    message: string;
    senderUsername: string;
    profileImage: string;
    image?: string; // Optional image prop
}

interface ChatListsProps {
    chats: Chat[];
    endOfMessages: React.RefObject<HTMLDivElement>;
}

const ChatLists: React.FC<ChatListsProps> = ({ chats, endOfMessages }) => {
    const user = JSON.parse(localStorage.getItem('userInfo') || '{}')?.name; // Ensure you retrieve the correct user info

    const SenderChat: React.FC<Chat> = ({ message, senderUsername, profileImage, image }) => {
        return (
            <div className="flex justify-end m-4">
                <div className="bg-primary text-white p-3 rounded-lg max-w-sm shadow-lg flex flex-col">
                    {/* Display image if exists */}
                    {image && (
                        <img
                            src={image}
                            alt="Received"
                            className="h-[100px] w-full object-cover rounded-sm my-3" // Fixed size for the image
                        />
                    )}
                    <p className='font-medium text-end overflow-wrap-break-word word-break-break-word whitespace-normal my-3'>{message}</p>

                    <div className='flex justify-start gap-4 flex-row-reverse '>
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
                    {/* Display image if exists */}
                    {image && (
                        <img
                            src={image}
                            alt="Received"
                            className="h-[100px] w-full object-cover rounded-sm my-3" // Fixed size for the image
                        />
                    )}

                    <p className='font-medium overflow-wrap-break-word word-break-break-word whitespace-normal'>{message}</p>

                </div>
            </div>
        );
    };

    return (
        <div className="overflow-y-scroll scrollbar-none flex flex-col h-full">
            {chats?.map((chat, index) => {
                if (chat.senderUsername === user) {
                    return (
                        <SenderChat
                            key={index}
                            message={chat.message}
                            senderUsername={chat.senderUsername}
                            profileImage={chat.profileImage}
                            image={chat.image} // Pass image prop
                        />
                    );
                } else {
                    return (
                        <ReceiverChat
                            key={index}
                            message={chat.message}
                            senderUsername={chat.senderUsername}
                            profileImage={chat.profileImage}
                            image={chat.image} // Pass image prop
                        />
                    );
                }
            })}
            {/* Scroll to this div to ensure scrolling to the bottom */}
            <div ref={endOfMessages}></div>
        </div>
    );
};

export default ChatLists;
