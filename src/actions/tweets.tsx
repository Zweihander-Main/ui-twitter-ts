import {
	GET_TWEETS,
	Tweets,
	GetTweets,
	ToggleTweet,
	TOGGLE_TWEET,
	LikeToggleToSave,
	RootState,
	RootAction,
	ADD_TWEET,
	AddTweet,
	Tweet,
	DELETE_TWEET,
	DeleteTweet,
} from '../types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveLikeToggle, saveTweet, saveDeleteTweet } from '../utils/api';

export const getTweets = (tweets: Tweets): GetTweets => ({
	type: GET_TWEETS,
	payload: {
		tweets,
	},
});

const toggleTweet = (info: LikeToggleToSave): ToggleTweet => ({
	type: TOGGLE_TWEET,
	payload: info,
});

export const handleToggleTweet: ActionCreator<ThunkAction<
	Promise<void>,
	RootState,
	null,
	RootAction
>> = (info: LikeToggleToSave) => {
	return (dispatch: Dispatch<RootAction>): Promise<void> => {
		dispatch(toggleTweet(info));
		return saveLikeToggle(info).catch((e) => {
			console.warn('Error in handleToggleTweet: ', e);
			dispatch(toggleTweet(info));
			alert('The was an error liking the tweet. Try again.');
		});
	};
};

const addTweet = (tweet: Tweet): AddTweet => ({
	type: ADD_TWEET,
	payload: tweet,
});

export const handleAddTweet: ActionCreator<ThunkAction<
	Promise<RootAction> | void,
	RootState,
	null,
	RootAction
>> = (text: string, replyingTo: null | string) => {
	return (
		dispatch: Dispatch<RootAction>,
		getState: () => RootState
	): Promise<RootAction> | void => {
		const { authedUser } = getState();
		if (authedUser) {
			dispatch(showLoading() as RootAction);
			return saveTweet({ text, replyingTo, author: authedUser })
				.then((tweet: Tweet): void => {
					dispatch(addTweet(tweet));
				})
				.then(() => dispatch(hideLoading() as RootAction));
		}
	};
};

const deleteTweet = (id: string, author: string): DeleteTweet => ({
	type: DELETE_TWEET,
	payload: {
		id,
		author,
	},
});

export const handleDeleteTweet: ActionCreator<ThunkAction<
	Promise<void> | void,
	RootState,
	null,
	RootAction
>> = (id: string, authorID: string) => {
	return (
		dispatch: Dispatch<RootAction>,
		getState: () => RootState
	): Promise<void> | void => {
		const { authedUser, tweets } = getState();
		const tweet = tweets[id];
		const { replyingTo } = tweet;
		const replyTweet = replyingTo ? tweets[replyingTo] : null;
		if (authedUser && authedUser === authorID) {
			dispatch(deleteTweet(id, authorID));
			return saveDeleteTweet({ id, replyingTo: replyTweet }).catch(
				(e) => {
					console.warn('Error in handleDeleteTweet: ', e);
					dispatch(addTweet(tweet));
					alert('The was an error deleting the tweet. Try again.');
				}
			);
		}
	};
};
