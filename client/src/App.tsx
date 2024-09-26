import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';
import Home from './components/home/Home';
import ChatPage from './components/chat/ChatPage';

const socket = io('http://localhost:5000');

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chat" element={<ChatPage />} />
			</Routes>
		</>
	);
}

export default App;
