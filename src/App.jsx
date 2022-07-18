import logo from './logo.svg';
import './App.css';
import Card from './components/card';
import Footer from './components/footer';

import { useState } from 'react';

function App() {
	const [count, setCount] = useState(0);

	const [renderCard, setRenderCard] = useState(false);

	const [data, setData] = useState({
		name: 'John',
		email: 'john@mail.com'
	});

	return (
		<div className="App">
			<div>
				<h1 className='title'>Hallo</h1>
				<p>{ count }</p>
			</div>
			{/* 
			<button
				onClick={ () => setCount(count + 1) }
			>
				Tambah 1
			</button> */}

			<button
				onClick={ () => setRenderCard(!renderCard) }
			>
				Tampilin Card
			</button>


			{ renderCard && <Card data={ data } /> }




		</div>
	);
}

export default App;
