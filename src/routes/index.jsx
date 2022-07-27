
import { useEffect, useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation
} from 'react-router-dom';
import About from '../pages/about';
import Cms from '../pages/cms';
import Detail from '../pages/detail';
import Home from '../pages/home';
import Login from '../pages/login';
import News from '../pages/news';
import EditNews from '../pages/news/edit';
import Register from '../pages/register';

const RouterComponent = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const arr = [];

	useEffect(() => {
		const accessToken = localStorage.getItem('access_token');
		if (accessToken) setIsLoggedIn(true);

	}, [isLoggedIn]);

	return (
		<Router>
			<Routes>
				{ !isLoggedIn
					?
					<>
						<Route path='/register' element={ <Register /> } />
						<Route path='/login' element={ <Login /> } />
					</>
					:
					<>
						<Route path='/' element={ <Home /> } />
						<Route path='/about' element={ <About /> } />
						<Route path='/cms' element={ <Cms /> } />
						<Route path='/news' element={ <News /> } />
						<Route path='/detail/:id' element={ <Detail /> } />
						<Route path='/news/:id' element={ <EditNews /> } />
					</>
				}

				<Route path="*" element={ <NoMatch /> } />

			</Routes>
		</Router>
	);
};

export default RouterComponent;

function NoMatch() {
	let location = useLocation();

	return (
		<div>
			<h3>
				No match for <code>{ location.pathname }</code>
			</h3>
		</div>
	);
}
