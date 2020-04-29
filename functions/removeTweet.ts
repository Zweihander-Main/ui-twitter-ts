/*eslint-disable no-console*/
import { ReturnData, returnPreflight, client } from './shared';
import {
	RemoveTweetById,
	RemoveTweetByIdMutation,
	RemoveTweetByIdMutationVariables,
	UpdateExistingTweet,
	UpdateExistingTweetMutation,
	UpdateExistingTweetMutationVariables,
} from './queries/graphql';
import { TweetToDelete } from '../src/types';

/**
 * Removes tweet from Fauna and updates any Tweets it may have been replying to.
 */

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	if (event.httpMethod === 'OPTIONS') {
		return returnPreflight();
	} else {
		if (!event.body) {
			throw new Error('No data provided to removeTweet');
		}
		const { id, replyingTo }: TweetToDelete = JSON.parse(event.body);

		const removeTweetVariables: RemoveTweetByIdMutationVariables = {
			id,
		};

		return client
			.mutate<RemoveTweetByIdMutation, RemoveTweetByIdMutationVariables>({
				mutation: RemoveTweetById,
				variables: removeTweetVariables,
			})
			.then((result) => result.data)
			.then((singleTweetResult) => {
				if (!singleTweetResult?.deleteTweet) {
					throw new Error('Problem with removing tweet in FaunaDB');
				}

				if (!replyingTo) {
					return {
						statusCode: 200,
						body: '',
					};
				}
				const replies = replyingTo.replies.filter(
					(reply) => reply !== id
				);

				const timestamp = new Date(replyingTo.timestamp).toISOString();

				const updateExistingTweetVariables: UpdateExistingTweetMutationVariables = {
					id: replyingTo.id,
					author: replyingTo.author,
					timestamp,
					text: replyingTo.text,
					likes: replyingTo.likes ? replyingTo.likes : [],
					replies: replies ? replies : [],
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
								'Problem with updating replies to deleted tweet in FaunaDB'
							);
						}
						return {
							statusCode: 200,
							body: '',
						};
					});
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
