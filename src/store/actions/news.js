export function setNews(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_NEWS',
			payload,
		});
	};
}

export function setNewsLoading(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_LOADING',
			payload,
		});
	};
}

export function setDetailNews(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_DETAIL_NEWS',
			payload,
		});
	};
}

export function setErrorNews(payload) {
	return (dispatch) => {
		dispatch({
			type: 'SET_ERROR',
			payload,
		});
	};
}
