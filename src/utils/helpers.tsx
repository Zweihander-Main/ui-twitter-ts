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
	const { id, text, timestamp } = tweet;
	let { likes, replies } = tweet;
	const { name, avatarURL } = author;

	if (!likes) {
		likes = [];
	}

	if (!replies) {
		replies = [];
	}

	return {
		name,
		id,
		timestamp,
		text,
		avatar: avatarURL,
		likes: likes.length,
		replies: replies.length,
		hasLiked: authedUser
			? likes.map((like) => like.id).includes(authedUser)
			: false,
		parent: !parentTweet
			? null
			: {
					author: parentTweet.author.id,
					id: parentTweet.id,
			  },
	};
}
