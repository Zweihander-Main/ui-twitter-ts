import { GetAllTweetsQuery, GetAllUsersQuery } from '../queries/graphql';
import { Users, Tweets, LikeToggleToSave, TweetToSave, Tweet } from '../types';
import ApolloClient from 'apollo-boost';
import { loader } from 'graphql.macro';
const getAllUsers = loader('../queries/getAllUsers.graphql');
const getAllTweets = loader('../queries/getAllTweets.graphql');
const URL = '/.netlify/functions/callAPI';

const client = new ApolloClient({
	uri: URL,
});

function _getUsers(): Promise<Users> {
	return client
		.query<GetAllUsersQuery>({ query: getAllUsers })
		.then((result) => result.data)
		.then((userQuery: GetAllUsersQuery) => {
			const userArray = userQuery.allUsers.data;
			const users = {};
			userArray.forEach((user) => {
				if (user) {
					users[user.name] = {
						id: user.id,
						name: user.name,
						avatarURL: user.avatarURL,
						tweets: user.tweets,
					};
				}
			});
			return users;
		});
}

function _getTweets(): Promise<Tweets> {
	return client
		.query<GetAllTweetsQuery>({ query: getAllTweets })
		.then((result) => result.data)
		.then((tweetQuery: GetAllTweetsQuery) => {
			const tweetArray = tweetQuery.allTweets.data;
			const tweets = {};
			tweetArray
				.map((tweet) => {
					if (tweet) {
						return {
							...tweet,
							timestamp: new Date(tweet.timestamp).getTime(),
						};
					} else {
						return null;
					}
				})
				.sort((a, b) => {
					if (a && b) {
						return b.timestamp - a.timestamp;
					}
					return 0;
				})
				.forEach((tweet) => {
					if (tweet) {
						const replyingToTweet = tweetArray.find(
							(possibleTweet) => {
								if (
									possibleTweet &&
									possibleTweet?.replies
										?.map((reply) => reply.id)
										.includes(tweet.id)
								) {
									return true;
								}
								return false;
							}
						);
						tweets[tweet.id] = {
							id: tweet.id,
							text: tweet.text,
							author: tweet.author.name,
							timestamp: tweet.timestamp,
							likes: tweet.likes
								? tweet.likes.map((like) => like.id)
								: [],
							replies: tweet.replies
								? tweet.replies.map((reply) => reply.id)
								: [],
							replyingTo: replyingToTweet
								? replyingToTweet.id
								: null,
						};
					}
				});
			return tweets;
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

//TODO re-implement
export function saveLikeToggle(info: LikeToggleToSave): Promise<void> {
	if (!info) {
		return Promise.resolve();
	}
	return Promise.resolve();
}

//TODO was Promise<Tweet>
export function saveTweet(info: TweetToSave): Promise<Tweet> {
	return Promise.resolve({
		...info,
		id: '',
		timestamp: 0,
		likes: [],
		replies: [],
	});
}
