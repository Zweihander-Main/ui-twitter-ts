import { Reducer } from 'redux';
import {
	GET_USERS,
	UserActionTypes,
	Users,
	ADD_TWEET,
	DELETE_TWEET,
	TweetActionTypes,
} from '../types';

const users: Reducer<Users, UserActionTypes | TweetActionTypes> = (
	state: Users = {},
	action: UserActionTypes | TweetActionTypes
) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, ...action.payload.users };
		case ADD_TWEET:
			return {
				...state,
				[action.payload.author]: {
					...state[action.payload.author],
					tweets: state[action.payload.author].tweets.concat(
						action.payload.id
					),
				},
			};
		case DELETE_TWEET:
			return {
				...state,
				[action.payload.author]: {
					...state[action.payload.author],
					tweets: state[action.payload.author].tweets.filter(
						(tweet) => tweet !== action.payload.id
					),
				},
			};

		default:
			return state;
	}
};

export default users;
