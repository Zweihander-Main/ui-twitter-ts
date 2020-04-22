/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type*/
(() => {
	const fetch = require('node-fetch');
	const fs = require('fs');

	const filePath = './scripts/masterSchema.gql';

	const stats = fs.statSync(filePath);
	const fileSizeInBytes = stats.size;
	const readStream = fs.createReadStream(filePath);

	const options = {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
		},
		'Content-Length': fileSizeInBytes,
	};
	const URL = 'https://graphql.fauna.com/import?mode=merge';

	fetch(URL, {
		method: options.method,
		headers: options.headers,
		body: readStream,
	})
		.then((res) => res.text())
		.then((text) => console.log(text))
		.catch((err) => {
			console.error(err);
		});
})();

