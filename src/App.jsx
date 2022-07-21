import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Provider } from 'react-redux';

import store from './store';
import Card from './components/card';
import Detail from './pages/detail';
import Home from './pages/home';
import Router from './routes';

function App() {

	return (
		<Provider store={ store }>
			<Router />
		</Provider>
	);
}

export default App;
