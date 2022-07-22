import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { secondInstances } from '../../axios';

import './styles.css';

const Login = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			navigate('/');
		}
	}, []);

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const sendData = await secondInstances.post('user/login', form);

			console.log(sendData, '<<< resp');

			if (sendData.data.message == 'success') {
				localStorage.setItem('access_token', sendData.data.token);
				navigate('/');
			}

		} catch (error) {
			setErrorMessage(error.message);
		}

		setLoading(false);
	};

	const onChange = (event) => {
		const name = event.currentTarget.name;
		const value = event.currentTarget.value;

		setForm({ ...form, [name]: value });
	};

	return (
		<div className='container'>
			<h1>Login</h1>

			<form onSubmit={ onSubmit }>
				<label htmlFor="email">Email</label>
				<br />
				<input type="email" name='email' id='email' onChange={ onChange } />
				<br /><br />

				<label htmlFor="password">Password</label>
				<br />
				<input type="password" name='password' id='password' onChange={ onChange } />
				<br /><br />

				{ loading
					?
					<div>Loading...</div>
					:
					<input type="submit" value="Login" />
				}
			</form>
		</div>
	);
};


export default Login;