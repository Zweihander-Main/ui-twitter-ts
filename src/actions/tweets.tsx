import { GET_TWEETS, Tweets, GetTweets } from '../types';

export const getTweets = (tweets: Tweets): GetTweets => ({
	type: GET_TWEETS,
	payload: {
		tweets,
	},
});
