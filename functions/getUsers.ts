/* eslint-disable no-console */
import faunadb from 'faunadb';

const q = faunadb.query;
const client = new faunadb.Client({
	secret: process.env.FAUNADB_SERVER_SECRET as string,
});

exports.handler = (): any => {
	return client
		.query(q.Paginate(q.Collections()))
		.then((response) => {
			console.log(response);
			// const todoRefs = response.data;
			// console.log('Todo refs', todoRefs);
			// console.log(`${todoRefs.length} todos found`);
			// // create new query out of todo refs. http://bit.ly/2LG3MLg
			// const getAllTodoDataQuery = todoRefs.map((ref) => {
			// 	return q.Get(ref);
			// });
			// // then query the refs
			// return client.query(getAllTodoDataQuery).then((ret) => {
			return {
				statusCode: 200,
				body: JSON.stringify(response),
			};
			// });
		})
		.catch((error) => {
			console.log('error', error);
			return {
				statusCode: 400,
				body: JSON.stringify(error),
			};
		});
};
