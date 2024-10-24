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
    <div className="mt-4">
      <label className="block mb-2">Add a Personalized Message:</label>
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        value={message}
        onChange={handleChange}
        placeholder="Write your message here..."
      />
    </div>
  );
};

export default MessageInput;
