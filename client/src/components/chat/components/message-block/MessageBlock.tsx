import { type FC, type FormEvent, useState } from 'react';
import socket from '../../../../service/socket';
import styles from './styles.module.css';

export const MessageBlock: FC = () => {
	const [message, setMessage] = useState('');

	const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} is typing`);

	const handleSend = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		socket.emit('sendMessage', {
			text: message,
			name: localStorage.getItem('user'),
			id: socket.id ? `${socket.id}--${Math.random()}` : '',
			socketID: socket.id,
		});
		setMessage('');
	};
	return (
		<div className={styles['message-block']}>
			<h1>Message</h1>
			<form className={styles.form} onSubmit={handleSend}>
				<input
					type="text"
					placeholder="Enter your message"
					className={styles['user-message']}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyUp={isTyping}
				/>
				<button className={styles.btn}>To Tell</button>
			</form>
		</div>
	);
};
