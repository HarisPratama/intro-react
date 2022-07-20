import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './styles.css';
import instance from '../../axios';
import Card from '../../components/card';

const Detail = () => {
	const navigate = useNavigate();

	const [movie, setMovie] = useState(null);
	const [movieRecomendations, setMovieRecomendations] = useState([]);

	const { id } = useParams();

	useEffect(() => {
		fetchingData();
	}, []);

	const fetchingData = async () => {
		try {
			const getDetail = await instance.get('/movie/' + id);
			if (getDetail.data) {
				setMovie(getDetail.data);
			}

			const getRecommendationsMovie = await instance.get(`/movie/${ id }/recommendations`);

			if (getRecommendationsMovie.data) {
				setMovieRecomendations(getRecommendationsMovie.data.results);
			}
		} catch (error) {
			console.log(error.message, '<< error');
		}
	};

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};


	return (
		<div className='outer-container'>
			{ movie && (
				<div className='container'>
					<p>{ movie.original_title }</p>
					{ <img src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path } width='100px' /> }
					<p>{ movie.overview }</p>
				</div>
			) }

			<div className='list'>
				{ movieRecomendations.map(movie => (
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
