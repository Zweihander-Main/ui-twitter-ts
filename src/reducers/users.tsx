import { Reducer } from 'redux';
import { GET_USERS, UserActionTypes, Users } from '../types';

const users: Reducer<Users, UserActionTypes> = (
	state: Users = {},
	action: UserActionTypes
) => {
	switch (action.type) {
		case GET_USERS:
			return { ...state, ...action.payload.users };
		default:
			return state;
	}
};

export default users;
