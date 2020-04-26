import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../types';
import Tweet from './Tweet';

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

const mapState = ({ tweets }: RootState): TimelineMappedState => {
	const tweetsEntries = Object.entries(tweets).sort((a, b) => {
		return b[1].timestamp - a[1].timestamp;
	});
	return {
		tweets: tweetsEntries.map((entry) => entry[0]),
	};
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Timeline);
