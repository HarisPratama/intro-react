import React, { useEffect } from 'react';
import './styles.css';


const Card = ({ movie, key }) => {

	if (movie) return (
		<div key={ movie.id } className='card' >
			{/* <img src={ 'https://image.tmdb.org/t/p/w500' + movie.poster_path } height='100px' /> */}
			<h5>{ movie.title }</h5>
			<p>{ movie.desc }</p>
		</div>
	);

	return null;
};

export default Card;
