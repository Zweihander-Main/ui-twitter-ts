/*eslint-disable no-console*/
import { ReturnData, returnPreflight, client, _getTweetInfo } from './shared';
import {
	UpdateExistingTweetMutationVariables,
	UpdateExistingTweetMutation,
	UpdateExistingTweet,
} from './queries/graphql';
import { LikeToggleToSave } from '../src/types';

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	if (event.httpMethod === 'OPTIONS') {
		return returnPreflight();
	} else {
		if (!event.body) {
			throw new Error('No data provided to saveLikeToggle');
		}
		const { id, hasLiked, authedUser }: LikeToggleToSave = JSON.parse(
			event.body
		);
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
					mutation: UpdateExistingTweet,
					variables: updateExistingTweetVariables,
				})
				.then((result) => result.data)
				.then((singleTweetResult) => {
					if (!singleTweetResult?.updateTweet) {
						throw new Error('Problem with liking tweet in FaunaDB');
					}
					return {
						statusCode: 200,
						body: '',
					};
				})
				.catch((error) => {
					console.log('error', error);
					return {
						statusCode: 400,
						body: JSON.stringify(error),
					};
				});
		});
	}
};

exports.handler = lambda;
