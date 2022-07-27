import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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

	useEffect(() => {
		dispatch(fetchingMovies());
	}, []);

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};

	return (
		<div className="App">
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
