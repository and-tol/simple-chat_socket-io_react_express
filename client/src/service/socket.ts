// socket.ts
import {io, Socket} from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000';

export type MessageType = {
	text: string;
	name: string | null;
	id: string;
	socketID: string | undefined;
};

export type UserType = {
	name: string | null;
	socketID: string | undefined;
};

// Типизация событий, которые отправляются на сервер
interface ServerToClientEvents {
	// message: (data: string) => void;
	response: (data: MessageType) => void;
	responseNewUser: (data: UserType[]) => void;
	responseTyping: (data: string) => void;
}

// Типизация событий, которые приходят от клиента на сервер
// interface ClientToServerEvents {
// 	sendMessage: (message: string) => void;
// }

interface ClientToServerEvents {
	sendMessage: (data: MessageType) => void;
	newUser: (data: UserType) => void;
	typing: (data: string) => void;
}

// Создание сокета с типами
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER_URL);

export default socket;
