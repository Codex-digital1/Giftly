import { useRef } from 'react';

const ChatLists = ({ chats }) => {
    const endOfMessages = useRef();
    const user = JSON.parse(localStorage.getItem('userInfo'))?.userName; // Ensure you retrieve the correct user info

    function SenderChat({ message, userName, profileImage }) {
        return (
            <div className="flex justify-end m-4">
                <div className="bg-[#aff6be] text-black p-3 rounded-lg max-w-xs shadow-lg flex space-x-2">
                    <div>
                        <p>
                            <strong>{userName}</strong> <br />
                            {message}
                        </p>
                    </div>
                    <img
                        src={profileImage}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                </div>
            </div>
        );
    }

    function ReceiverChat({ message, userName, profileImage }) {
        return (
            <div className="flex justify-start m-4">
                <div className="bg-gray-300 text-black p-3 rounded-lg max-w-xs shadow-lg flex space-x-2">
                    <img
                        src={profileImage}
                        alt=""
                        className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                    <div>
                        <p>
                            <strong>{userName}</strong> <br />
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="overflow-y-scroll scrollbar-none flex flex-col h-full">
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
