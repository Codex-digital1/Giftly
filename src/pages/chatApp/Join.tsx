import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "/logo.png";

let user;

const sendUser = () => {
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
};

const Join: React.FC = () => {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col justify-between max-w-lg bg-gray-100 container mx-auto border-2 mt-[100px] border-red-500 h-[600px] z-50">
      {/* Chat Header */}
      <div className="bg-red-500 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Seller Avatar" className="w-10 h-10 rounded-full" />
          <span className="text-xl">Seller Name</span>
        </div>
      </div>

      {/* Join Input */}
      <div className="p-4">
        <input
          onChange={(e) => setName(e.target.value)}
          type="text"
          id="joinInput"
          className="w-full p-2 border rounded-lg focus:outline-none"
          placeholder="Enter your name..."
        />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chatApp">
          <button onClick={sendUser} type="submit" className="bg-red-500 text-white px-4 mt-2 rounded-lg">
            Join Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
