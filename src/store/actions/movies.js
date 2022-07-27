export function setMovies(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_MOVIES',
			payload
		});
	};
}

export function setMovie(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_MOVIE',
			payload
		});
	};
}

export function setMovieRecommendations(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_MOVIE_RECOMENDATIONS',
			payload
		});
	};
}

export function setMoviesLoading(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_MOVIES_LOADING',
			payload
		});
	};
}

export function setMoviesError(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_MOVIES_ERROR',
			payload
		});
	};
}
