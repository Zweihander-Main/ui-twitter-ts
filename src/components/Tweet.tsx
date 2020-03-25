import React, { Component } from 'react';
import {
	RootState,
	UITweet,
	RootAction,
	LikeToggleToSave,
	AuthedUserType,
} from '../types';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { handleToggleTweet } from '../actions/tweets';
import { formatTweet, formatDate } from '../utils/helpers';
import {
	TiArrowBackOutline,
	TiHeartOutline,
	TiHeartFullOutline,
} from 'react-icons/ti';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

class Tweet extends Component<
	PropsFromRedux & TweetProps & RouteComponentProps
> {
	handleLike = (e: React.MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();
		const { tweet, authedUser, handleToggleTweetDispatch } = this.props;
		const { id, hasLiked } = tweet;
		handleToggleTweetDispatch({ id, hasLiked, authedUser });
	};

	toParent = (e: React.MouseEvent<HTMLButtonElement>, id: string): void => {
		e.preventDefault();
		this.props.history.push(`/tweet/${id}`);
	};

	render(): JSX.Element {
		const {
			id,
			name,
			timestamp,
			text,
			avatar,
			likes,
			replies,
			hasLiked,
			parent,
		} = this.props.tweet;
		return (
			<Link to={`/tweet/${id}`} className="tweet">
				<img
					src={avatar}
					alt={`Avatar of ${name}`}
					className="avatar"
				/>
				<div className="tweet-info">
					<div>
						<span>{name}</span>
						<div>{formatDate(timestamp)}</div>
						{parent && (
							<button
								className="replying-to"
								onClick={(
									e: React.MouseEvent<HTMLButtonElement>
								): void => this.toParent(e, parent.id)}
							>
								Replying to @{parent.author}
							</button>
						)}
						<p>{text}</p>
					</div>
					<div className="tweet-icons">
						<TiArrowBackOutline className="tweet-icon" />
						<span>{replies !== 0 && replies}</span>
						<button
							className="heart-button"
							onClick={this.handleLike}
						>
							{hasLiked === true ? (
								<TiHeartFullOutline
									color="#e0245e"
									className="tweet-icon"
								/>
							) : (
								<TiHeartOutline className="tweet-icon" />
							)}
						</button>
						<span>{likes !== 0 && likes}</span>
					</div>
				</div>
			</Link>
		);
	}
}

interface TweetProps {
	tweetID: string;
}

interface TweetMappedState {
	tweet: UITweet;
	authedUser: AuthedUserType;
}

const mapState = (
	{ tweets, users, authedUser }: RootState,
	{ tweetID }: TweetProps
): TweetMappedState => {
	const tweet = tweets[tweetID];
	const { author, replyingTo } = tweet;
	const parentTweet = replyingTo ? tweets[replyingTo] : undefined;
	const tweetAuthorObject = users[author];
	return {
		tweet: formatTweet(tweet, tweetAuthorObject, authedUser, parentTweet),
		authedUser,
	};
};

const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, null, RootAction>
): { handleToggleTweetDispatch: (info: LikeToggleToSave) => Promise<void> } => {
	return {
		handleToggleTweetDispatch: (info: LikeToggleToSave): Promise<void> =>
			dispatch(handleToggleTweet(info)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const connectedTweet = connector(Tweet);

export default withRouter(connectedTweet);
