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

export interface LikeToggleToSave {
	id: string;
	hasLiked: boolean;
	authedUser: string;
}

export interface TweetToSave {
	author: string;
	text: string;
	replyingTo: null | string;
}
