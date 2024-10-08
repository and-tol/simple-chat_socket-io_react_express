import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import socket from '../../service/socket';

const Home = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState('');

	function handleSubmit(e: any) {
		e.preventDefault();
		localStorage.setItem(`user`, JSON.stringify(user));
		socket.emit('newUser', {
			name: user,
			socketID: socket.id,
		});
		if (user) {
			navigate('/chat');
		}
	}

	return (
		<div>
			<h1>Home</h1>

			<form onSubmit={handleSubmit} className={styles.container}>
				<h2>Enter into the chat</h2>
				<label htmlFor="user"></label>
				<input
					type="text"
					name="user"
					id="user"
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
				<button type="submit">Enter</button>
			</form>
		</div>
	);
};

export default Home;
