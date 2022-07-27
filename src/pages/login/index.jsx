import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { secondInstances } from '../../axios';

import './styles.css';

const Login = () => {
	const navigate = useNavigate();
	let location = useLocation();


	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		email: '',
		password: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const sendData = await secondInstances.post('user/login', form);

			if (sendData.data?.message == 'success') {
				localStorage.setItem('access_token', sendData.data.token);
				navigate('/');
			} else {
				setErrorMessage('Login failed');
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

			<p>{ errorMessage }</p>

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