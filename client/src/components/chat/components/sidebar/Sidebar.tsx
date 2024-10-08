import {useEffect, useState} from 'react';
import socket, {type UserType} from '../../../../service/socket';
import styles from './styles.module.css';

export const Sidebar = () => {
	const [users, setUsers] = useState<UserType[]>([]);
console.log('>>',users);
	useEffect(() => {
		socket.on('responseNewUser', (data: UserType[]) => {
			setUsers(data);
		});
	}, [socket, users]);
	
	const filteredListUsers = users.filter((value, index, self) => {
		index === self.findIndex(t => (
			t.name ===value.name && t.socketID === value.socketID
		))
	})
	
	return (
		<div className={styles.sidebar}>
			<h4 className={styles.header}>Users</h4>
			<ul className={styles.users}>
				<>
					{filteredListUsers.map((u, key) => (
						<li key={`${u.socketID}-${key}`}>{u.name}</li>
					))}
				</>
			</ul>
		</div>
	);
};
