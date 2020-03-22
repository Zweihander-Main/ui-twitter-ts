import { Reducer } from 'redux';
import { GET_TWEETS, TweetActionTypes, Tweets } from '../types';

const tweets: Reducer<Tweets, TweetActionTypes> = (
	state: Tweets = {},
	action: TweetActionTypes
) => {
	switch (action.type) {
		case GET_TWEETS:
			return { ...state, ...action.payload.tweets };
		default:
			return state;
	}
};

export default tweets;
