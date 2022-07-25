import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './styles.css';

const Navbar = () => {
	const navigate = useNavigate();

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to={ '/cms' }>
							CMS
						</Link>
					</li>
					<li>
						<button onClick={ logout } >Logout</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Navbar;
