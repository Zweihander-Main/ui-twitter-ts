import gql from 'graphql-tag';

const query = gql`
	query {
		allUsers {
			data {
				name
			}
		}
	}
`;

const allUsers = () => {
	return fetch('/.netlify/functions/callAPI', {
		body: JSON.stringify(query),
		method: 'POST',
	}).then((response) => {
		return response.json();
		console.log(response.json());
	});
};

declare global {
	interface Window {
		check: any;
	}
}

window.check = allUsers;
