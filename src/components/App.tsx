import React, { Component, Fragment } from 'react';
import { RootState, RootAction } from '../types';
import { handleInitialData } from '../actions/shared';
import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoadingBar from 'react-redux-loading';
import Timeline from './Timeline';
import Compose from './Compose';
import TweetPage from './TweetPage';
import Nav from './Nav';

class App extends Component<PropsFromRedux> {
	componentDidMount(): void {
		const { handleInitialDataDispatch } = this.props;
		handleInitialDataDispatch();
	}

	render(): JSX.Element {
		return (
			<Router>
				<Fragment>
					<LoadingBar />
					<div className="container">
						<Nav />
						{this.props.loading === true ? null : (
							<div>
								<Route path="/" exact component={Timeline} />
								<Route
									path="/tweet/:id"
									component={TweetPage}
								/>
								<Route path="/new" component={Compose} />
							</div>
						)}
					</div>
				</Fragment>
			</Router>
		);
	}
}

interface AppMappedProps {
	loading: boolean;
}

const mapState = ({ tweets, users }: RootState): AppMappedProps => ({
	loading: tweets && users ? false : true,
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, null, RootAction>
): { handleInitialDataDispatch: () => Promise<void> } => {
	return {
		handleInitialDataDispatch: (): Promise<void> =>
			dispatch(handleInitialData()),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedApp = connector(App);

export default ConnectedApp;
