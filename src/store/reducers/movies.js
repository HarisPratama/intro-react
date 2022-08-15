import instance from "../../axios";
import { setMovie, setMovieRecommendations, setMovies, setMoviesError, setMoviesLoading } from "../actions/movies";

const initialState = {
	movies: [],
	movie: {},
	recommendations: [],
	loading: true,
	error: null,
};

export default function moviesReducer(state = initialState, action) {
	switch (action.type) {
		case 'SET_MOVIES':
			return { ...state, movies: action.payload };
		case 'SET_MOVIE':
			return { ...state, movie: action.payload };
		case 'SET_MOVIE_RECOMENDATIONS':
			return { ...state, recommendations: action.payload };
		case 'SET_MOVIES_LOADING':
			return { ...state, loading: action.payload };
		case 'SET_MOVIES_ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
}

export function fetchingMovies() {
	return async (dispatch) => {
		dispatch(setMoviesLoading(true));
		try {
			const getData = await instance.get('/articles');

			if (getData.data?.data) {
				dispatch(setMovies(getData.data.data));
				dispatch(setMoviesLoading(false));
			}
		} catch (error) {
			console.log(error, '<< error');
			dispatch(setMoviesError(error));
			dispatch(setMoviesLoading(false));
		}
	};
}

export function fetchingMovie(id) {
	return async (dispatch) => {
		dispatch(setMoviesLoading(true));
		try {
			const getData = await instance.get(`/movie/${ id }`);

			if (getData.data) {
				dispatch(setMovie(getData.data));
				dispatch(setMoviesLoading(false));
			}
		} catch (error) {
			dispatch(setMoviesError(error));
			dispatch(setMoviesLoading(false));
		}
	};
}

export function fetchingMovieRecommendations(id) {
	return async (dispatch) => {
		dispatch(setMoviesLoading(true));
		try {
			const getData = await instance.get(`/movie/${ id }/recommendations`);

			if (getData.data?.results) {
				dispatch(setMovieRecommendations(getData.data.results));
				dispatch(setMoviesLoading(false));
			}
		} catch (error) {
			dispatch(setMoviesError(error));
			dispatch(setMoviesLoading(false));
		}
	};
}
