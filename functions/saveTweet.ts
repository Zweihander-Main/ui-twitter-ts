/*eslint-disable no-console*/
import {
	ReturnData,
	returnPreflight,
	client,
	_getTweetInfo,
	_singleTweetMapper,
} from './shared';
import {
	UpdateExistingTweet,
	UpdateExistingTweetMutationVariables,
	UpdateExistingTweetMutation,
	CreateNewTweetMutationVariables,
	CreateNewTweetMutation,
	CreateNewTweet,
} from './queries/graphql';
import { TweetToSave } from '../src/types';

/**
 * Saves new tweet and updates any new tweets it was replying to.
 */

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	if (event.httpMethod === 'OPTIONS') {
		return returnPreflight();
	} else {
		if (!event.body) {
			throw new Error('No data provided to saveTweet');
		}
		const { text, author, replyingTo }: TweetToSave = JSON.parse(
			event.body
		);

		const timestamp = new Date().toISOString();

		const createNewTweetVariables: CreateNewTweetMutationVariables = {
			author,
			timestamp,
			text,
		};

		return client
			.mutate<CreateNewTweetMutation, CreateNewTweetMutationVariables>({
				mutation: CreateNewTweet,
				variables: createNewTweetVariables,
			})
			.then((result) => result.data)
			.then((singleTweetResult) => {
				if (!singleTweetResult?.createTweet) {
					throw new Error('Problem with saving tweet to FaunaDB');
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
							mutation: UpdateExistingTweet,
							variables: updateExistingTweetVariables,
						})
						.then((result) => result.data)
						.then((replyingTweetResult) => {
							if (!replyingTweetResult?.updateTweet) {
								throw new Error(
									'Problem with adding replies to tweets in FaunaDB'
								);
							}
							return _singleTweetMapper(tweet, replyingTo);
						});
				});
			})
			.then((data) => {
				return {
					statusCode: 200,
					body: JSON.stringify(data),
				};
			})
			.catch((error) => {
				console.log('error', error);
				return {
					statusCode: 400,
					body: JSON.stringify(error),
				};
			});
	}
};

exports.handler = lambda;
