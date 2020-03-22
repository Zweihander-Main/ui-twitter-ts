import { SET_AUTHED_USER, SetAuthedUser, AuthedUserType } from '../types';

export const setAuthedUser = (authedUser: AuthedUserType): SetAuthedUser => ({
	type: SET_AUTHED_USER,
	payload: { authedUser },
});
