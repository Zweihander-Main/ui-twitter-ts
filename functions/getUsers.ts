/*eslint-disable no-console*/
import { ReturnData, returnPreflight, client } from './shared';
import { GetAllUsersQuery, GetAllUsers } from './queries/graphql';
import { Users } from '../src/types';

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	if (event.httpMethod === 'OPTIONS') {
		return returnPreflight();
	} else {
		return client
			.query<GetAllUsersQuery>({ query: GetAllUsers })
			.then((result) => result.data)
			.then((userQuery: GetAllUsersQuery) => {
				if (!userQuery?.allUsers) {
					throw new Error('Could not get data on users from Fauna');
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
				return users as Users;
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
