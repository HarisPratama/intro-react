const initialState = {
	news: [],
	newsRecomendation: [],
	detailNews: {}
};

const newsReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return { ...state, news: action.payload };
		case 'SET_NEWS_RECOMENDATION':
			return { ...state, newsRecomendation: action.payload };
		case 'SET_DETAIL_NEWS':
			return { ...state, detailNews: action.payload };
		default:
			return state;
	}
};

export default newsReducers;
