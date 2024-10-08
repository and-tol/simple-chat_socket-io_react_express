import { useEffect, useState } from 'react';
import { Body } from './components/body/Body';
import { MessageBlock } from './components/message-block/MessageBlock';
import { Sidebar } from './components/sidebar/Sidebar';
import styles from './styles.module.css';
import socket, { MessageType } from '../../service/socket';
const delay = 1000;
const ChatPage = () => {
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [status, setStatus] = useState<string>('');

	useEffect(() => {
		socket.on('response', (data) => setMessages([...messages, data]));
	}, [socket, messages]);

	useEffect(() => {
		socket.on('responseTyping', (data) => {
			setStatus(data);
			setTimeout(() => { //? FIXME: not good implemented
				setStatus('');
			}, delay);
		});
	}, [socket]);

	return (
		<>
			<h1>Chat Page</h1>
			<div className={styles.chat}>
				<aside>
					<Sidebar />
				</aside>
				<main className={styles.main}>
					<Body messages={messages} status={status} />
					<MessageBlock />
				</main>
			</div>
		</>
	);
};

export default ChatPage;
