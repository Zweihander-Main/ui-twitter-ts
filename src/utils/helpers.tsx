import { Tweet, User, UITweet, AuthedUserType } from '../types';

export function formatDate(timestamp: number): string {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString('en-US');
	return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatTweet(
	tweet: Tweet,
	author: User,
	authedUser: AuthedUserType,
	parentTweet?: Tweet
): UITweet {
	const { id, likes, replies, text, timestamp } = tweet;
	const { name, avatarURL } = author;

	return {
		name,
		id,
		timestamp,
		text,
		avatar: avatarURL,
		likes: likes.length,
		replies: replies.length,
		hasLiked: authedUser ? likes.includes(authedUser) : false,
		parent: !parentTweet
			? null
			: {
					authorName: parentTweet.authorName,
					id: parentTweet.id,
			  },
	};
}
