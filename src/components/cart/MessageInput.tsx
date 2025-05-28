import React, { useState } from 'react';

interface Props {
  onMessageChange: (message: string) => void;
}

const MessageInput: React.FC<Props> = ({ onMessageChange }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    onMessageChange(e.target.value);
  };

  return (
    <div className="">
      <label className="text-sm font-medium leading-none text-zinc-700 dark:text-zinc-300 ">Add a Personalized Message:</label>
      <textarea
        className="w-full mt-2 p-2 border border-gray-300 rounded"
        rows={1}
        value={message}
        onChange={handleChange}
        placeholder="Write your message here..."
      />
    </div>
  );
};

export default MessageInput;
