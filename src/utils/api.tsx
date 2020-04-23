import { GetAllTweetsQuery, GetAllUsersQuery } from '../queries/graphql';
import { Users, Tweets } from '../types';
import ApolloClient from 'apollo-boost';
import { loader } from 'graphql.macro';
const getAllUsers = loader('../queries/getAllUsers.graphql');
const getAllTweets = loader('../queries/getAllTweets.graphql');
const URL = '/.netlify/functions/callAPI';

const client = new ApolloClient({
	uri: URL,
});

function _getUsers(): Promise<GetAllUsersQuery> {
	return client
		.query<GetAllUsersQuery>({ query: getAllUsers })
		.then((result) => result.data);
}

function _getTweets(): Promise<GetAllTweetsQuery> {
	return client
		.query<GetAllTweetsQuery>({ query: getAllTweets })
		.then((result) => result.data);
}

export function getInitialData(): Promise<{
	users: Users;
	tweets: Tweets;
}> {
	return Promise.all([_getUsers(), _getTweets()]).then(
		([userData, tweetData]) => ({
			users: userData.allUsers.data,
			tweets: tweetData.allTweets.data,
		})
	);
}

//TODO re-implement
export function saveLikeToggle(/*info: LikeToggleToSave*/): Promise<void> {
	return Promise.resolve();
}

//TODO was Promise<Tweet>
export function saveTweet(/*info: TweetToSave*/): Promise<void> {
	return Promise.resolve();
}
