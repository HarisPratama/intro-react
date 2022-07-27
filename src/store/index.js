import { combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import newsReducers from './reducers/news';
import moviesReducer from './reducers/movies';

// const reducers = combineReducers({
// 	news: newsReducers
// });

const reducers = {
	reducer: {
		news: newsReducers,
		movies: moviesReducer
	}
};

const store = configureStore(reducers, applyMiddleware(thunk));

export default store;
