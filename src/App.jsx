import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link
} from 'react-router-dom';

import Card from './components/card';
import Detail from './pages/detail';
import Home from './pages/home';

function App() {

	return (
		<Router>
			<div className='navbar'>
				<nav>
					<ul>
						<li>
							<Link to='/' >Home</Link>
						</li>
					</ul>
				</nav>
			</div>

			<Routes>
				<Route path='/' element={ <Home /> } />
				<Route path='/detail/:id' element={ <Detail /> } />
			</Routes>
		</Router>

	);
}

export default App;
