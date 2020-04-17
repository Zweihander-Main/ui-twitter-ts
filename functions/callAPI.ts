/* eslint-disable no-console */
import ApolloClient from 'apollo-boost';
import fetch from 'cross-fetch';

const URL = 'https://graphql.fauna.com/graphql';

const client = new ApolloClient({
	uri: URL,
	fetch,
	request: (operation): void => {
		operation.setContext({
			headers: {
				Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
			},
		});
	},
});

interface ReturnData {
	statusCode: number;
	body: string;
}

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	const query = JSON.parse(event.body as string);
	return client
		.query({ query })
		.then((response) => {
			console.log(response);
			return {
				statusCode: 200,
				body: JSON.stringify(response),
			};
		})
		.catch((error) => {
			console.log('error', error);
			return {
				statusCode: 400,
				body: JSON.stringify(error),
			};
		});
};

exports.handler = lambda;
