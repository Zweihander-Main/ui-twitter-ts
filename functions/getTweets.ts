/*eslint-disable no-console*/
import {
	ReturnData,
	returnPreflight,
	client,
	_singleTweetMapper,
} from './shared';
import { GetAllTweetsQuery, GetAllTweets } from './queries/graphql';
import { Tweets } from '../src/types';

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	if (event.httpMethod === 'OPTIONS') {
		return returnPreflight();
	} else {
		return client
			.query<GetAllTweetsQuery>({ query: GetAllTweets })
			.then((result) => result.data)
			.then((tweetQuery: GetAllTweetsQuery) => {
				if (!tweetQuery?.allTweets) {
					throw new Error('Could not get data on tweets from Fauna');
				}
				const tweetArray = tweetQuery.allTweets.data;
				const tweets = {};
				tweetArray.forEach((tweet) => {
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
						const replyingToTweetID = replyingToTweet
							? replyingToTweet.id
							: null;
						tweets[tweet.id] = _singleTweetMapper(
							tweet,
							replyingToTweetID
						);
					}
				});
				return tweets as Tweets;
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
