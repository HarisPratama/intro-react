import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Card from '../../components/card';
import instance from '../../axios';

const Home = () => {
	const navigate = useNavigate();

	const [state, setState] = useState([]);
	const [secondState, setSecondState] = useState([]);

	useEffect(() => {
		fetchingData();
	}, []);

	const fetchingData = async () => {
		try {
			const getMovies = await instance.get('/movie/now_playing');

			if (getMovies.data) {
				setState(getMovies.data.results);
			}
		} catch (error) {
			console.log(error.message, '<< error');
		}
	};

	const toDetail = (id) => {
		navigate('/detail/' + id);
	};

	return (
		<div className="App">
			<div className='list'>
				{ state.map(movie => (
					<div onClick={ () => toDetail(movie.id) } >
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

export default Home;
