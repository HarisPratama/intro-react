import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { secondInstances } from '../../axios';
import './styles.css';

const Register = () => {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState({
		name: '',
		email: '',
		password: '',
		role: '',
	});
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) {
			navigate('/');
		}
	}, []);

	const onSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		try {

			if (form.name == '') {
				throw { message: 'Name Required' };
			} else {
				const sendData = await secondInstances.post('user/register', form);

				if (sendData.data.message == 'Success register') {
					navigate('/login');
				}
			}

		} catch (error) {
			console.log(error.message, '<<< error');
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
			<h1>Register</h1>

			<h5>{ errorMessage }</h5>

			<form onSubmit={ onSubmit }>

				<label htmlFor="name">Name</label>
				<br />
				<input type="text" name='name' id='name' onChange={ onChange } />
				<br /><br />

				<label htmlFor="email">Email</label>
				<br />
				<input type="email" name='email' id='email' onChange={ onChange } />
				<br /><br />

				<label htmlFor="password">Password</label>
				<br />
				<input type="password" name='password' id='password' onChange={ onChange } />
				<br /><br />

				<label htmlFor="role">Role</label>
				<br />
				<select name="role" id="role" onChange={ onChange } >
					<option value="">Select Role</option>
					<option value="admin">Admin</option>
					<option value="member">Member</option>
				</select>
				<br /><br />

				{ loading
					?
					<div>Loading</div>
					:
					<input type="submit" value="Register" />
				}

			</form>

		</div>
	);
};

export default Register;
