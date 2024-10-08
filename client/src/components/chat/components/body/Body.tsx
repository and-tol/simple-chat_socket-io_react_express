import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { type FC } from 'react';
import { MessageType } from '../../../../service/socket';

type BodyProps = {
	messages: MessageType[];
	status: string;
};

export const Body: FC<BodyProps> = ({ messages, status }) => {
	const navigate = useNavigate();

	const handleLeave = () => {
		localStorage.removeItem('user');
		navigate('/');
	};

	return (
		<>
			<header className={styles.header}>
				<button type="button" className={styles.btn} onClick={handleLeave}>
					Leave the chatroom
				</button>
			</header>
			<div className={styles.container}>
				{messages.map((m) => {
					if (m.name === localStorage.getItem('user')) {
						return (
							<div key={m.id} className={styles.chats}>
								<p className={styles.senderName}>You</p>
								<div className={styles.messageSender}>
									<p>{m.text}</p>
								</div>
							</div>
						);
					} else {
						return (
							<div key={m.id} className={styles.chats}>
								<p>{m.name}</p>
								<div className={styles.messageRecipient}>
									<p>{m.text}</p>
								</div>
							</div>
						);
					}
				})}

				<div className={styles.status}>
					<p>{`${status}....`}</p>
				</div>
			</div>
		</>
	);
};
