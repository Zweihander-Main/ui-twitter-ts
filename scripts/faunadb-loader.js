/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type */

/**
 * FaunaDB loader for GraphQL Code Generator. Pulls the Schema from Fauna,
 * builds it, and sends it back to codegen.
 */

const {
	getIntrospectionQuery,
	buildClientSchema,
} = require('graphql/utilities');
const fetch = require('node-fetch');

module.exports = (url) => {
	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
		},
	};
	return fetch(url, {
		method: options.method,
		headers: options.headers,
		body: JSON.stringify({ query: getIntrospectionQuery() }),
	})
		.then((res) => res.json())
		.then((schemaJSON) => buildClientSchema(schemaJSON.data))
		.catch((err) => {
			console.error(err);
		});
};
