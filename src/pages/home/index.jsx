import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Card from '../../components/card';
import instance from '../../axios';
import { colorContext } from '../about';


const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const newsSelector = useSelector((state) => state.news);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			navigate('/login');
		}

		fetchingData();
	}, []);

	const fetchingData = async () => {
		try {
			const getMovies = await instance.get('/movie/now_playing');

			if (getMovies.data) {
				setLoading(false);
				dispatch({
					type: 'SET_NEWS',
					payload: getMovies.data.results
				});
			}
		} catch (error) {
			console.log(error.message, '<< error');
		}
	};

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};

	const logout = () => {
		localStorage.clear();
		navigate('/login');
	};

	return (
		<div className="App">
			<div>
				{ loading ? (
					<div>
						<h1>Loading........</h1>
					</div>
				) : (
					<div>

						<button onClick={ logout } >Logout</button>
						<div className='list'>
							{/* { JSON.stringify(newsSelector?.news) } */ }
							{ newsSelector?.news && newsSelector?.news?.map((movie, i) => {
								return (
									<div onClick={ () => toDetail(movie.id) } >
										<Card
											key={ movie.id }
											movie={ movie }
										/>
									</div>
								);
							}) }
						</div>
					</div>
				) }
			</div>
		</div>
	);
};

export default Home;
