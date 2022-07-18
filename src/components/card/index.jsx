import React from 'react';
import './styles.css';

function Card({ data }) {
	return (
		<div>
			<div className=''>
				<h1>{ data?.name }</h1>
				<h3>{ data?.email }</h3>
			</div>
		</div>
	);
}

// const Card = () => {
// 	return (
// 		<div className='card'>
// 			<h1>Card</h1>
// 		</div>
// 	);
// };

export default Card;