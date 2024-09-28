import {  useState } from 'react';
import { FaReact } from 'react-icons/fa6';
import _ from 'lodash';
import '../style.css'

const UserLogin = ({ setUser, setReceiver }) => {
    const [userName, setUserName] = useState('');
    const [role, setRole] = useState('normal-user');
    const [receiverName, setReceiverName] = useState('');

    const handleUser = async (e) => {
        e.preventDefault()
        if (!userName || !receiverName) return;

        // Save user info in localStorage
        const userInfo = {
            username: userName,
            role: role, // Change as necessary
            avatar: `https://picsum.photos/id/${_.random(1, 1000)}/200/300`
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('receiver', receiverName);

        try {
            // Post request to create a new user
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log('User created:', createdUser);
            } else {
                console.log('Failed to create user');
            }
        } catch (error) {
            console.log('Error:', error);
        }

        setUser(userName);
        setReceiver(receiverName);
    };

    return (
        <div className='login_container'>
            <div className='login_title'>
                <FaReact className='login_icon' />
                <h1>Chat App</h1>
            </div>
            <div className='login_form'>
                <input
                    type="text"
                    placeholder='Enter your username'
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='Enter receiver username'
                    onChange={(e) => setReceiverName(e.target.value)}
                />

                <select name="" onChange={(e)=>setRole(e.target.value)} id="">
                    <option value="normal-user">normal-user</option>
                    <option value="admin">admin</option>
                </select>

                <button onClick={handleUser}>Login</button>
            </div>
        </div>
    );
};

export default UserLogin;