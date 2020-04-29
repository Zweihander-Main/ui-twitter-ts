import { Reducer } from 'redux';
import {
	GET_TWEETS,
	TweetActionTypes,
	Tweets,
	TOGGLE_TWEET,
	ADD_TWEET,
	DELETE_TWEET,
} from '../types';

const tweets: Reducer<Tweets, TweetActionTypes> = (
	state: Tweets = {},
	action: TweetActionTypes
) => {
	switch (action.type) {
		case GET_TWEETS:
			return { ...state, ...action.payload.tweets };
		case TOGGLE_TWEET:
			return {
				...state,
				[action.payload.id]: {
					...state[action.payload.id],
					likes: action.payload.authedUser
						? action.payload.hasLiked === true
							? state[action.payload.id].likes.filter(
									(userId) =>
										userId !== action.payload.authedUser
							  )
							: state[action.payload.id].likes.concat([
									action.payload.authedUser,
							  ])
						: state[action.payload.id].likes,
				},
			};
		case ADD_TWEET: {
			let replyingTo = {};
			if (action.payload.replyingTo !== null) {
				replyingTo = {
					[action.payload.replyingTo]: {
						...state[action.payload.replyingTo],
						replies: state[
							action.payload.replyingTo
						].replies.concat([action.payload.id]),
					},
				};
			}
			return {
				...state,
				[action.payload.id]: action.payload,
				...replyingTo,
			};
		}
		case DELETE_TWEET: {
			const newState = { ...state };
			const deletedTweet = newState[action.payload.id];
			const { replyingTo } = deletedTweet;
			if (replyingTo) {
				const repliedTweet = newState[replyingTo];
				newState[replyingTo].replies = repliedTweet.replies.filter(
					(reply) => reply !== action.payload.id
				);
				if (!Array.isArray(newState[replyingTo].replies)) {
					newState[replyingTo].replies = [];
				}
			}
			delete newState[action.payload.id];
			return newState;
		}
		default:
			return state;
	}
};

export default tweets;
