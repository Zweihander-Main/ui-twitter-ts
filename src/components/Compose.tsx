import { RootState, RootAction, AuthedUserType } from '../types';
import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Redirect } from 'react-router-dom';
import { handleAddTweet } from '../actions/tweets';

interface ComposeProps {
	tweetID: string;
}

interface ComposeState {
	text: string;
	toHome: boolean;
}

class Compose extends Component<PropsFromRedux & ComposeProps, ComposeState> {
	state = {
		text: '',
		toHome: false,
	};

	handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
		const text = e.target.value;
		this.setState(() => ({ text }));
	};

	handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const { text } = this.state;
		const { tweetID, handleAddTweetDispatch } = this.props;
		handleAddTweetDispatch(text, tweetID);
		this.setState(() => ({
			text: '',
			toHome: tweetID ? false : true,
		}));
	};

	render(): JSX.Element | null {
		const { text, toHome } = this.state;
		const { authedUser } = this.props;

		if (toHome === true) {
			return <Redirect to="" />;
		}

		if (!authedUser) {
			return null;
		}

		const tweetLeft = 280 - text.length;

		return (
			<div>
				<h3 className="center">Compose new Tweet</h3>
				<form className="new-tweet" onSubmit={this.handleSubmit}>
					<textarea
						placeholder="What's happening?"
						value={text}
						onChange={this.handleChange}
						className="textarea"
						maxLength={280}
					/>
					{tweetLeft <= 100 && (
						<div className="tweet-length">{tweetLeft}</div>
					)}
					<button
						className="btn"
						type="submit"
						disabled={text === ''}
					>
						Submit
					</button>
				</form>
			</div>
		);
	}
}

interface ComposeMappedProps {
	authedUser: AuthedUserType;
}

const mapState = ({ authedUser }: RootState): ComposeMappedProps => ({
	authedUser,
});

const mapDispatchToProps = (
	dispatch: ThunkDispatch<RootState, null, RootAction>
): {
	handleAddTweetDispatch: (
		text: string,
		replyingTo: null | string
	) => Promise<RootAction> | void;
} => {
	return {
		handleAddTweetDispatch: (
			text: string,
			replyingTo: null | string
		): Promise<RootAction> | void =>
			dispatch(handleAddTweet(text, replyingTo)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Compose);
