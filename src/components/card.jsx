import React, { useEffect } from 'react';



const Card = ({ movies }) => {

	return (
		<div className='card' >
			<img src={ 'https://image.tmdb.org/t/p/w500' + movies.poster_path } height='100px' />
			<h5>{ movies.title }</h5>
			<p>{ movies.overview }</p>
		</div>
	);
};

export default Card;
