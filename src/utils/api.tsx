import {
	Users,
	Tweets,
	LikeToggleToSave,
	TweetToSave,
	Tweet,
	TweetToDelete,
} from '../types';

const baseURL = '/.netlify/functions/';

const _getUsers = (): Promise<Users> => {
	return fetch(`${baseURL}getUsers`).then((response) => {
		return response.json();
	});
};

const _getTweets = (): Promise<Tweets> => {
	return fetch(`${baseURL}getTweets`).then((response) => {
		return response.json();
	});
};

function _saveLikeToggle(info: LikeToggleToSave): Promise<void> {
	return fetch(`${baseURL}saveLikeToggle`, {
		method: 'POST',
		body: JSON.stringify(info),
	}).then(() => {
		return Promise.resolve();
	});
}

function _saveTweet(info: TweetToSave): Promise<Tweet> {
	return fetch(`${baseURL}saveTweet`, {
		method: 'POST',
		body: JSON.stringify(info),
	}).then((response) => {
		return response.json();
	});
}

function _saveDeleteTweet(info: TweetToDelete): Promise<void> {
	return fetch(`${baseURL}removeTweet`, {
		method: 'POST',
		body: JSON.stringify(info),
	}).then(() => {
		return Promise.resolve();
	});
}

export function getInitialData(): Promise<{
	users: Users;
	tweets: Tweets;
}> {
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

export function saveDeleteTweet(info: TweetToDelete): Promise<void> {
	return _saveDeleteTweet(info);
}
