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
} from '../types';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { showLoading, hideLoading } from 'react-redux-loading';
import { saveLikeToggle, saveTweet } from '../utils/api';

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
		// TODO other case
	};
};
