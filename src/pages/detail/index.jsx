import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './styles.css';
import instance from '../../axios';
import Card from '../../components/card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchingMovie, fetchingMovieRecommendations } from '../../store/reducers/movies';

const Detail = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const moviesSelector = useSelector((state) => state.movies);

	const { id } = useParams();

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (!accessToken) {
			navigate('/login');
		} else {
			dispatch(fetchingMovie(id));
			dispatch(fetchingMovieRecommendations(id));
		}
	}, [id]);

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};


	return (
		<div className='outer-container'>
			{ moviesSelector.loading && <h1>Loading...</h1> }
			{ !moviesSelector.loading && moviesSelector?.movie && (
				<div className='container-movies'>
					<p>{ moviesSelector?.movie.original_title }</p>
					{ <img src={ 'https://image.tmdb.org/t/p/w500' + moviesSelector?.movie.poster_path } width='100px' /> }
					<p>{ moviesSelector?.movie.overview }</p>
				</div>
			) }

			<div className='list'>
				{ !moviesSelector.loading && moviesSelector?.recommendations && moviesSelector.recommendations.map(movie => (
					<div onClick={ () => toDetail(movie.id) }>
						<Card
							key={ movie.id }
							movie={ movie }
						/>
					</div>
				)) }
			</div>

		</div>
	);
};

export default Detail;
