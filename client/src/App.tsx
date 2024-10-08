import { Route, Routes } from 'react-router-dom';
import ChatPage from './components/chat/ChatPage';
import Home from './components/home/Home';
import socket from './service/socket';


function App() {
	return (
		<Routes>
			<Route path="/" element={<Home socket={socket} />} />
			<Route path="/chat" element={<ChatPage />} />
		</Routes>
	);
}

export default App;
