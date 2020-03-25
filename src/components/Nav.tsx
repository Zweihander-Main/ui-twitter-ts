import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, AuthedUserType } from '../types';

const Nav: React.FC<PropsFromRedux> = ({ authedUser }: NavMappedProps) => {
	return (
		<nav className="nav">
			<ul>
				<li>
					<NavLink to="/" exact activeClassName="active">
						Home
					</NavLink>
				</li>
				{authedUser ? (
					<li>
						<NavLink to="/new" activeClassName="active">
							New Tweet
						</NavLink>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

interface NavMappedProps {
	authedUser: AuthedUserType;
}

const mapState = ({ authedUser }: RootState): NavMappedProps => ({
	authedUser,
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Nav);
