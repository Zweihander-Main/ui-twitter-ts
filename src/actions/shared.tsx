import { Users, Tweets, RootAction, RootState } from '../types';
import { getTweets } from './tweets';
import { getUsers } from './users';
import { setAuthedUser } from './authedUsers';
import { getInitialData } from '../utils/api';
import { Dispatch, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { showLoading, hideLoading } from 'react-redux-loading';

const AUTHED_ID = '263475986979357202'; //TODO

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
				dispatch(setAuthedUser(AUTHED_ID));
				dispatch(hideLoading() as RootAction);
			}
		);
	};
};
