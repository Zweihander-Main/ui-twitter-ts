import { GET_USERS, Users, GetUsers } from '../types';

export const getUsers = (users: Users): GetUsers => ({
	type: GET_USERS,
	payload: {
		users,
	},
});
