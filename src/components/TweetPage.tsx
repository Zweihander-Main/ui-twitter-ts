import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { RootState } from '../types';
import Tweet from './Tweet';
import Compose from './Compose';

class TweetPage extends Component<PropsFromRedux> {
	render(): JSX.Element {
		const { tweetID, replies } = this.props;
		return (
			<div>
				<Tweet tweetID={tweetID} />
				<Compose tweetID={tweetID} />
				{replies.length !== 0 && <h3 className="center">Replies</h3>}
				<ul>
					{replies.map((replyId) => (
						<li key={replyId}>
							<Tweet tweetID={replyId} />
						</li>
					))}
				</ul>
			</div>
		);
	}
}

interface TweetPageMappedProps {
	replies: Array<string>;
	tweetID: string;
}

interface MatchParams {
	id: string;
}

const mapState = (
	{ tweets }: RootState,
	{ match }: RouteComponentProps<MatchParams>
): TweetPageMappedProps => {
	const { id } = match.params;
	return {
		tweetID: id,
		replies: !tweets[id]
			? []
			: tweets[id].replies.sort(
					(a, b) => tweets[b].timestamp - tweets[a].timestamp
			  ),
	};
};

const connector = connect(mapState);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(TweetPage);
