import { Action } from 'redux';
import { loadingBarReducer } from 'react-redux-loading';

export interface User {
	id: string;
	name: string;
	avatarURL: string;
	tweets: Array<string>;
}

export interface Users {
	[key: string]: User;
}

export interface Tweet {
	id: string;
	text: string;
	author: string;
	timestamp: number;
	likes: Array<string>;
	replies: Array<string>;
	replyingTo: string | null;
}

export interface Tweets {
	[key: string]: Tweet;
}

export interface UIParentTweet {
	author: string;
	id: string;
}

export interface UITweet {
	name: string;
	id: string;
	timestamp: number;
	text: string;
	avatar: string;
	likes: number;
	replies: number;
	hasLiked: boolean;
	parent: null | UIParentTweet;
}

export type UITweets = Array<UITweet>;

export type AuthedUserType = string | null;

export interface LikeToggleToSave {
	id: string;
	hasLiked: boolean;
	authedUser: AuthedUserType;
}

export interface TweetToSave {
	author: string;
	text: string;
	replyingTo: null | string;
}

export interface RootState {
	users: Users;
	tweets: Tweets;
	authedUser: AuthedUserType;
	loadingBar: typeof loadingBarReducer;
}

export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const GET_TWEETS = 'GET_TWEETS';
export const GET_USERS = 'GET_USERS';

export interface SetAuthedUser extends Action<typeof SET_AUTHED_USER> {
	type: typeof SET_AUTHED_USER;
	payload: {
		authedUser: AuthedUserType;
	};
}

export interface GetTweets extends Action<typeof GET_TWEETS> {
	type: typeof GET_TWEETS;
	payload: {
		tweets: Tweets;
	};
}

export interface GetUsers extends Action<typeof GET_USERS> {
	type: typeof GET_USERS;
	payload: {
		users: Users;
	};
}

export type AuthedUserActionTypes = SetAuthedUser;
export type TweetActionTypes = GetTweets;
export type UserActionTypes = GetUsers;

export type RootAction =
	| AuthedUserActionTypes
	| TweetActionTypes
	| UserActionTypes;
