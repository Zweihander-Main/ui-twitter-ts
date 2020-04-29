import { Users, Tweets, RootAction, RootState, AuthedUserType } from '../types';
import { getTweets } from './tweets';
import { getUsers } from './users';
import { setAuthedUser } from './authedUsers';
import { getInitialData } from '../utils/api';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { showLoading, hideLoading } from 'react-redux-loading';

/**
 * Always sets the authed user to Tyler McGinnis.
 *
 * @param      {Users}   users   The users
 * @return     {string}  { description_of_the_return_value }
 */
function setAdminUser(users: Users): AuthedUserType {
	const userValues = Object.values(users);
	const authedUser = userValues.find(
		(user) => user.name === 'Tyler McGinnis'
	);
	if (authedUser) {
		return authedUser.id;
	}
	return null;
}

export const handleInitialData: ActionCreator<ThunkAction<
	Promise<void>,
	RootState,
	null,
	RootAction
>> = () => {
	return (dispatch: Dispatch<RootAction>): Promise<void> => {
		dispatch(showLoading() as RootAction);
		return getInitialData().then(
			({ users, tweets }: { users: Users; tweets: Tweets }): void => {
				dispatch(getUsers(users));
				dispatch(getTweets(tweets));

				dispatch(setAuthedUser(setAdminUser(users)));
				dispatch(hideLoading() as RootAction);
			}
		);
	};
};
