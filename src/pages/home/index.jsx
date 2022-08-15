import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {io} from 'socket.io-client'

import Card from '../../components/card';
import instance from '../../axios';
import { colorContext } from '../about';
import './styles.css';
import Navbar from '../../components/navbar';
import { fetchingMovies } from '../../store/reducers/movies';

const Home = () => {

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const moviesSelector = useSelector((state) => state.movies);
	const loadingFetchMovies = useSelector((state) => state.movies.loading);

	const [news, setNews] = useState([])

	const socket = io("http://localhost:3001")

	useEffect(() => {
		socket.on('news', (...args) => {
			if (socket.connected) {
				setNews(args[0].data)
			}
			// console.log(socket.connected, '<<< connected socket')
			// console.log(args[0].data, 'args')
		})
	}, [])

	useEffect(() => {
		// getProfile()
		dispatch(fetchingMovies());
	}, []);

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};


	const getProfile = async () => {
		try {
			const token = localStorage.getItem('access_token');

			const getData = await instance.get('/user/profile', {
				headers: {
					Authorization: `Bearer ${ token }`
				}
			})

			console.log(getData.data, '<<< profile');

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="App">
			{/* <img src={ data.image } alt="" /> */ }
			<div>
				{ loadingFetchMovies ? (
					<div>
						<h1>Loading........</h1>
					</div>
				) : (
					<div>
						<Navbar />

						<div className='list'>
							{/* { JSON.stringify(moviesSelector?.news) } */ }
							{ news && news?.map((movie, i) => {
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

						<div className='list' style={{ marginTop: '100px' }} >
							{/* { JSON.stringify(moviesSelector?.news) } */ }
							{ moviesSelector?.movies && moviesSelector?.movies?.map((movie, i) => {
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
