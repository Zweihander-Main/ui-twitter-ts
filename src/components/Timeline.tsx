import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types';
import Tweet from './Tweet';
// TODO determine SFC

class Timeline extends Component<PropsFromRedux> {
	render(): JSX.Element {
		const { tweets } = this.props;
		return (
			<div>
				<h1>Your Timeline</h1>
				<ul>
					{tweets.map(
						(id: string): JSX.Element => {
							return (
								<li key={id}>
									<Tweet tweetID={id} />
								</li>
							);
						}
					)}
				</ul>
			</div>
		);
	}
}

interface TimelineMappedState {
	tweets: Array<string>;
}

const mapState = ({ tweets }: RootState): TimelineMappedState => ({
	tweets: Object.keys(tweets),
});

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Timeline);
