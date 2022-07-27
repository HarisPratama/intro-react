import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';


import './styles.css';

const Cms = ({ children }) => {

	const navigate = useNavigate();

	const [state, setState] = useState(0);
	const [bold, setBold] = useState(false);

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			navigate('/login');
		}
	}, []);

	return (
		<div>
			<Navbar />
			<div className='cms-container'>
				<div className="sidebar">
					<nav>
						<ul>
							<li>
								<Link to={ '/news' }>
									News
								</Link>
							</li>
						</ul>
					</nav>
				</div>
				<div className="content">
					{ children }
				</div>
			</div>
		</div>
	);
};

export default Cms;
