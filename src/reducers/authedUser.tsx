import { Reducer } from 'redux';
import {
	SET_AUTHED_USER,
	AuthedUserType,
	AuthedUserActionTypes,
} from '../types';

const authedUser: Reducer<AuthedUserType, AuthedUserActionTypes> = (
	state: AuthedUserType = null,
	action: AuthedUserActionTypes
) => {
	switch (action.type) {
		case SET_AUTHED_USER:
			return action.payload.authedUser;
		default:
			return state;
	}
};

export default authedUser;
