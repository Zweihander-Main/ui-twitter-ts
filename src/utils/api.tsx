import {
	GetAllTweetsQuery,
	GetAllUsersQuery,
	CreateNewTweetMutation,
	CreateNewTweetMutationVariables,
	UpdateExistingTweetMutation,
	UpdateExistingTweetMutationVariables,
	GetTweetByIdQuery,
	GetTweetByIdQueryVariables,
} from '../queries/graphql';
import { Users, Tweets, LikeToggleToSave, TweetToSave, Tweet } from '../types';
import ApolloClient from 'apollo-boost';
import { loader } from 'graphql.macro';

const getAllUsers = loader('../queries/getAllUsers.graphql');
const getAllTweets = loader('../queries/getAllTweets.graphql');
const createNewTweet = loader('../queries/createNewTweet.graphql');
const updateExistingTweet = loader('../queries/updateExistingTweet.graphql');
const getTweetByID = loader('../queries/getTweetByID.graphql');

const URL = '/.netlify/functions/callAPI';

const client = new ApolloClient({
	uri: URL,
});

function _getUsers(): Promise<Users> {
	return client
		.query<GetAllUsersQuery>({ query: getAllUsers })
		.then((result) => result.data)
		.then((userQuery: GetAllUsersQuery) => {
			if (!userQuery?.allUsers) {
				return Promise.reject('Could not get data on users from Fauna');
			}
			const userArray = userQuery.allUsers.data;
			const users = {};
			userArray.forEach((user) => {
				if (user) {
					const tweets: Array<string> = [];
					user.tweets.data.forEach((tweet) => {
						if (tweet) {
							tweets.push(tweet.id);
						}
					});
					users[user.id] = {
						id: user.id,
						name: user.name,
						avatarURL: user.avatarURL,
						tweets,
					};
				}
			});
			return users;
		});
}

function _singleTweetMapper(
	gqlTweet: NonNullable<GetAllTweetsQuery['allTweets']['data'][0]>,
	replyingToTweetID?: string | null
): Tweet {
	return {
		id: gqlTweet.id,
		text: gqlTweet.text,
		author: gqlTweet.author.id,
		authorName: gqlTweet.author.name,
		timestamp: new Date(gqlTweet.timestamp).getTime(),
		likes: gqlTweet.likes ? gqlTweet.likes.map((like) => like.id) : [],
		replies: gqlTweet.replies
			? gqlTweet.replies.map((reply) => reply.id)
			: [],
		replyingTo: replyingToTweetID ? replyingToTweetID : null,
	};
}

function _getTweets(): Promise<Tweets> {
	return client
		.query<GetAllTweetsQuery>({ query: getAllTweets })
		.then((result) => result.data)
		.then((tweetQuery: GetAllTweetsQuery) => {
			if (!tweetQuery?.allTweets) {
				return Promise.reject(
					'Could not get data on tweets from Fauna'
				);
			}
			const tweetArray = tweetQuery.allTweets.data;
			const tweets = {};
			tweetArray.forEach((tweet) => {
				if (tweet) {
					const replyingToTweet = tweetArray.find((possibleTweet) => {
						if (
							possibleTweet &&
							possibleTweet?.replies
								?.map((reply) => reply.id)
								.includes(tweet.id)
						) {
							return true;
						}
						return false;
					});
					const replyingToTweetID = replyingToTweet
						? replyingToTweet.id
						: null;
					tweets[tweet.id] = _singleTweetMapper(
						tweet,
						replyingToTweetID
					);
				}
			});
			return tweets;
		});
}

function _getTweetInfo(
	id: string
): Promise<NonNullable<GetTweetByIdQuery['findTweetByID']>> {
	const getTweetByIDVariables: GetTweetByIdQueryVariables = {
		id,
	};
	return client
		.query<GetTweetByIdQuery, GetTweetByIdQueryVariables>({
			query: getTweetByID,
			variables: getTweetByIDVariables,
		})
		.then((result) => result.data)
		.then((singleTweetResult) => {
			if (!singleTweetResult?.findTweetByID) {
				return Promise.reject('Could not get tweet data from Fauna');
			}
			return singleTweetResult.findTweetByID;
		});
}

function _saveLikeToggle({
	id,
	hasLiked,
	authedUser,
}: LikeToggleToSave): Promise<void> {
	return _getTweetInfo(id).then((tweet) => {
		let likes = tweet.likes ? tweet.likes.map((like) => like.id) : [];
		if (hasLiked) {
			likes = likes.filter((like) => like !== authedUser);
		} else {
			likes.push(authedUser as string);
		}
		const updateExistingTweetVariables: UpdateExistingTweetMutationVariables = {
			id: tweet.id,
			author: tweet.author.id,
			timestamp: tweet.timestamp,
			text: tweet.text,
			likes,
			replies: tweet.replies
				? tweet.replies.map((reply) => reply.id)
				: [],
		};
		return client
			.mutate<
				UpdateExistingTweetMutation,
				UpdateExistingTweetMutationVariables
			>({
				mutation: updateExistingTweet,
				variables: updateExistingTweetVariables,
			})
			.then((result) => result.data)
			.then((singleTweetResult) => {
				if (!singleTweetResult?.updateTweet) {
					return Promise.reject(
						'Problem with liking tweet in FaunaDB'
					);
				}
				return Promise.resolve();
			});
	});
}

function _saveTweet({ text, author, replyingTo }: TweetToSave): Promise<Tweet> {
	const timestamp = new Date().toISOString();

	const createNewTweetVariables: CreateNewTweetMutationVariables = {
		author,
		timestamp,
		text,
	};

	return client
		.mutate<CreateNewTweetMutation, CreateNewTweetMutationVariables>({
			mutation: createNewTweet,
			variables: createNewTweetVariables,
		})
		.then((result) => result.data)
		.then((singleTweetResult) => {
			if (!singleTweetResult?.createTweet) {
				return Promise.reject('Problem with saving tweet to FaunaDB');
			}
			const tweet = singleTweetResult.createTweet;
			if (!replyingTo) {
				return _singleTweetMapper(tweet, replyingTo);
			}
			return _getTweetInfo(replyingTo).then((replyingTweet) => {
				const updateExistingTweetVariables: UpdateExistingTweetMutationVariables = {
					id: replyingTweet.id,
					author: replyingTweet.author.id,
					timestamp: replyingTweet.timestamp,
					text: replyingTweet.text,
					likes: replyingTweet.likes
						? replyingTweet.likes.map((like) => like.id)
						: [],
					replies: replyingTweet.replies
						? replyingTweet.replies
								.map((reply) => reply.id)
								.concat(tweet.id)
						: [tweet.id],
				};
				return client
					.mutate<
						UpdateExistingTweetMutation,
						UpdateExistingTweetMutationVariables
					>({
						mutation: updateExistingTweet,
						variables: updateExistingTweetVariables,
					})
					.then((result) => result.data)
					.then((replyingTweetResult) => {
						if (!replyingTweetResult?.updateTweet) {
							return Promise.reject(
								'Problem with adding replies to tweets in FaunaDB'
							);
						}
						return _singleTweetMapper(tweet, replyingTo);
					});
			});
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
