const initialState = {
	news: [],
	newsRecomendation: []
};

const newsReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return { ...state, news: action.payload };
		case 'SET_NEWS_RECOMENDATION':
			return { ...state, newsRecomendation: action.payload };
		default:
			return state;
	}
};

export default newsReducers;
