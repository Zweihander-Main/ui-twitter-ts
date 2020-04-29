import ApolloClient from 'apollo-boost';
import fetch from 'cross-fetch';
import {
	GetAllTweetsQuery,
	GetTweetByIdQuery,
	GetTweetByIdQueryVariables,
	GetTweetById,
} from '../queries/graphql';
import { Tweet } from '../../src/types';

/**
 * Common code shared between different lambda functions.
 */

const URL = 'https://graphql.fauna.com/graphql';
const Authorization = `Bearer ${process.env.FAUNADB_SERVER_SECRET}`;
export const returnHeaders = {
	'cache-control': 'no-cache no-store max-age=0 must-revalidate',
};
const standardHeaders = {
	'Access-Control-Allow-Methods': 'GET, POST',
	...returnHeaders,
};

export interface ReturnData {
	statusCode: number;
	body: string;
	headers?: typeof standardHeaders | typeof returnHeaders;
}

export function returnPreflight(): Promise<ReturnData> {
	return Promise.resolve({
		statusCode: 204,
		headers: standardHeaders,
		body: JSON.stringify({}),
	});
}

export const client = new ApolloClient({
	uri: URL,
	fetch,
	request: (operation): void => {
		operation.setContext({
			headers: {
				Authorization,
			},
		});
	},
});

export function _singleTweetMapper(
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

export function _getTweetInfo(
	id: string
): Promise<NonNullable<GetTweetByIdQuery['findTweetByID']>> {
	const getTweetByIDVariables: GetTweetByIdQueryVariables = {
		id,
	};
	return client
		.query<GetTweetByIdQuery, GetTweetByIdQueryVariables>({
			query: GetTweetById,
			variables: getTweetByIDVariables,
		})
		.then((result) => result.data)
		.then((singleTweetResult) => {
			if (!singleTweetResult?.findTweetByID) {
				throw new Error('Could not get tweet data from Fauna');
			}
			return singleTweetResult.findTweetByID;
		});
}
