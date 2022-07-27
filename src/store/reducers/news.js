import { secondInstances } from "../../axios";
import { setDetailNews, setErrorNews, setNews, setNewsLoading } from "../actions/news";

const initialState = {
	news: [],
	newsRecomendation: [],
	detailNews: {},
	loading: true,
	error: null,
};

const newsReducers = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_NEWS':
			return { ...state, news: action.payload };
		case 'SET_NEWS_RECOMENDATION':
			return { ...state, newsRecomendation: action.payload };
		case 'SET_DETAIL_NEWS':
			return { ...state, detailNews: action.payload };
		case 'SET_LOADING':
			return { ...state, loading: action.payload };
		case 'SET_ERROR':
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default newsReducers;

export function fetchnews() {
	return async (dispatch) => {
		dispatch(setNewsLoading(true));

		try {
			const getData = await secondInstances.get('news');
			if (getData.data?.data) {
				dispatch(setNews(getData.data.data));
				dispatch(setNewsLoading(false));
			}
		} catch (error) {
			dispatch(setErrorNews(error));
			dispatch(setNewsLoading(false));
		}

	};
}

export function fetchDetailNews(id) {
	return async (dispatch) => {
		dispatch(setNewsLoading(true));

		try {
			const getDetailNews = await secondInstances.get(`news/${ id }`);
			if (getDetailNews.data?.data) {
				dispatch(setDetailNews(getDetailNews.data.data));
				dispatch(setNewsLoading(false));
			}
		} catch (error) {
			dispatch(setErrorNews(error));
			dispatch(setNewsLoading(false));
		}

	};
}
