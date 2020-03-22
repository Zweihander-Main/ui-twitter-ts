import { LikeToggleToSave, TweetToSave, Users, Tweets, Tweet } from '../types';
import { _getUsers, _getTweets, _saveLikeToggle, _saveTweet } from './_DATA.js';

export function getInitialData(): Promise<{ users: Users; tweets: Tweets }> {
	return Promise.all([_getUsers(), _getTweets()]).then(([users, tweets]) => ({
		users,
		tweets,
	}));
}

export function saveLikeToggle(info: LikeToggleToSave): Promise<void> {
	return _saveLikeToggle(info);
}

export function saveTweet(info: TweetToSave): Promise<Tweet> {
	return _saveTweet(info);
}
