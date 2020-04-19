/*eslint-disable no-console*/
import fetch from 'cross-fetch';

const URL = 'https://graphql.fauna.com/graphql';
const Authorization = `Bearer ${process.env.FAUNADB_SERVER_SECRET}`;

const standardHeaders = {
	'Access-Control-Allow-Methods': 'POST',
};

interface ReturnData {
	statusCode: number;
	body: string;
	headers?: typeof standardHeaders;
}

const lambda: AWSLambda.Handler<AWSLambda.APIGatewayProxyEvent, ReturnData> = (
	event: AWSLambda.APIGatewayProxyEvent
) => {
	//preflight
	if (event.httpMethod === 'OPTIONS') {
		return Promise.resolve({
			statusCode: 204,
			headers: standardHeaders,
			body: JSON.stringify({}),
		});
	} else {
		// copy headers
		const headers = {
			...event.headers,
			Authorization,
		};
		delete headers['origin'];
		delete headers['host'];

		const options = {
			method: event.httpMethod,
			headers: headers,
			body: event.body,
		};

		return fetch(URL, options)
			.then((response) => {
				return response.json().then((data) => {
					return {
						statusCode: response.status,
						body: JSON.stringify(data),
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
