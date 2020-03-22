import React, { Component } from 'react';
import { RootState, RootAction } from '../types';
import { handleInitialData } from '../actions/shared';
import { ThunkDispatch } from 'redux-thunk';
import { connect, ConnectedProps } from 'react-redux';

class App extends Component<PropsFromRedux> {
	componentDidMount(): void {
		const { handleInitialDataDispatch } = this.props;
		handleInitialDataDispatch();
	}

	render(): JSX.Element {
		return <div>Start Code</div>;
	}
}

const mapState = (state: RootState): RootState => ({ ...state });

const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, null, RootAction>
): { [key: string]: Function } => {
	return {
		handleInitialDataDispatch: (): Promise<void> =>
			dispatch(handleInitialData()),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ConnectedApp = connector(App);

export default ConnectedApp;
