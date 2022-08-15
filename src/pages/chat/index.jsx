import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { io } from 'socket.io-client'

const Chat = () => {

	const socket = io("http://localhost:3001")

	const users = [
		{
			id: 1,
			name: 'aris'
		},
		{
			id: 2,
			name: 'budi'
		}
	];
	const [chats, setChat] = useState([]);

	const [userLogin, setUserLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [message, setMessage] = useState('');
	const [pickUser, setPickUser] = useState(null);

	const [onSending, setOnSending] = useState(false);

	useEffect(() => {
		if (user) {
			socket.on('chat', (...args) => {
				if (socket.connected) {
					setChat(args[0].data[user])
				}
			})
		}
	}, [user])

	const onSubmit = (e) => {
		e.preventDefault()
		setUserLogin(true)
	}

	const sendMessage = (e) => {
		e.preventDefault()
		setOnSending(true)

		const data = {
			sender: user,
			message: message,
			to: pickUser.id,
		}

		socket.emit('message', {data})		
	}

	if (!userLogin) {
		return (
			<div style={{ display: 'flex', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
			<form onSubmit={onSubmit}>
				<input type="text" onChange={(e) => setUser(e.target.value)} placeholder="Enter ID" />
				<input type="submit" value="Login" />
			</form>
			</div>
		)
	} else return (
		<div style={{ display: 'flex' }}>
			<div style={ { width: '200px', height: '100vh', borderRight: '1px solid grey' }}>
				{ users.map(item => (
					<>
						{item.id != user &&
							<div onClick={ () => setPickUser(item) }  key={item.id} style={{ padding: '20px', cursor: 'pointer' }}>
							{item.name}
						</div>
					}
					</>
				)) }
			</div>
			<div style={{ padding: '40px', position: 'relative', width: '100%', maxHeight: '100vh' }}>
				<div style={{ height: '500px', overflowY: 'auto', display: 'block', position: 'static' }}>
					{ pickUser && chats && chats?.length && chats?.map(chat => (
						<div style={ { display: 'flex', flexDirection: 'column', padding: '20px' }} key={chat.id}>
								{chat.sender == user ? 
								<div style={{ alignSelf: 'end', background: 'green', color: 'white', padding: '10px', borderRadius: '8px' }}>
									{chat.message}
								</div>
								:
								<div style={ { alignSelf: 'start', background: 'blue', color: 'white', padding: '10px', borderRadius: '8px' }}>
									{chat.message}
								</div>
							}
							</div>
					))}
				</div>

				<div style={{ position: 'absolute', width: '100%', bottom: '0', left: '0' }} >
					<form onSubmit={sendMessage} style={{ display: 'flex' }}>
						<textarea type="text" style={{ width: '100%', border: '1px solid black', height: '50px' }} onChange={e => setMessage(e.target.value)} />
						<input type="submit" value="Send Message" style={{ background: 'green', color: 'white', width: '200px' }} />
					</form>
				</div>
			</div>
		</div>
	)
}

export default Chat
