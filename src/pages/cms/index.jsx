import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/navbar';


import './styles.css';

const Cms = ({ children }) => {

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
