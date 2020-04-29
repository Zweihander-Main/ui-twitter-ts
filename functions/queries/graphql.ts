import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	Date: any;
	Time: any;
	/** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
	Long: any;
};

export type Mutation = {
	/** Update an existing document in the collection of 'User' */
	updateUser?: Maybe<User>;
	/** Create a new document in the collection of 'User' */
	createUser: User;
	/** Delete an existing document in the collection of 'Tweet' */
	deleteTweet?: Maybe<Tweet>;
	/** Create a new document in the collection of 'Tweet' */
	createTweet: Tweet;
	/** Delete an existing document in the collection of 'User' */
	deleteUser?: Maybe<User>;
	/** Update an existing document in the collection of 'Tweet' */
	updateTweet?: Maybe<Tweet>;
};

export type MutationUpdateUserArgs = {
	id: Scalars['ID'];
	data: UserInput;
};

export type MutationCreateUserArgs = {
	data: UserInput;
};

export type MutationDeleteTweetArgs = {
	id: Scalars['ID'];
};

export type MutationCreateTweetArgs = {
	data: TweetInput;
};

export type MutationDeleteUserArgs = {
	id: Scalars['ID'];
};

export type MutationUpdateTweetArgs = {
	id: Scalars['ID'];
	data: TweetInput;
};

/** Allow manipulating the relationship between the types 'Tweet' and 'User' using the field 'Tweet.author'. */
export type TweetAuthorRelation = {
	/** Create a document of type 'User' and associate it with the current document. */
	create?: Maybe<UserInput>;
	/** Connect a document of type 'User' with the current document using its ID. */
	connect?: Maybe<Scalars['ID']>;
};

/** 'Tweet' input values */
export type TweetInput = {
	author?: Maybe<TweetAuthorRelation>;
	timestamp: Scalars['Time'];
	text: Scalars['String'];
	likes?: Maybe<Array<Scalars['ID']>>;
	replies?: Maybe<Array<Scalars['ID']>>;
};

/** 'User' input values */
export type UserInput = {
	name: Scalars['String'];
	avatarURL: Scalars['String'];
	tweets?: Maybe<UserTweetsRelation>;
};

/** Allow manipulating the relationship between the types 'User' and 'Tweet'. */
export type UserTweetsRelation = {
	/** Create one or more documents of type 'Tweet' and associate them with the current document. */
	create?: Maybe<Array<Maybe<TweetInput>>>;
	/** Connect one or more documents of type 'Tweet' with the current document using their IDs. */
	connect?: Maybe<Array<Maybe<Scalars['ID']>>>;
	/** Disconnect the given documents of type 'Tweet' from the current document using their IDs. */
	disconnect?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type Query = {
	/** Find a document from the collection of 'User' by its id. */
	findUserByID?: Maybe<User>;
	/** Find a document from the collection of 'Tweet' by its id. */
	findTweetByID?: Maybe<Tweet>;
	allUsers: UserPage;
	allTweets: TweetPage;
};

export type QueryFindUserByIdArgs = {
	id: Scalars['ID'];
};

export type QueryFindTweetByIdArgs = {
	id: Scalars['ID'];
};

export type QueryAllUsersArgs = {
	_size?: Maybe<Scalars['Int']>;
	_cursor?: Maybe<Scalars['String']>;
};

export type QueryAllTweetsArgs = {
	_size?: Maybe<Scalars['Int']>;
	_cursor?: Maybe<Scalars['String']>;
};

export type Tweet = {
	author: User;
	timestamp: Scalars['Time'];
	/** The document's ID. */
	_id: Scalars['ID'];
	text: Scalars['String'];
	likes?: Maybe<Array<User>>;
	replies?: Maybe<Array<Tweet>>;
	/** The document's timestamp. */
	_ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Tweet'. */
export type TweetPage = {
	/** The elements of type 'Tweet' in this page. */
	data: Array<Maybe<Tweet>>;
	/** A cursor for elements coming after the current page. */
	after?: Maybe<Scalars['String']>;
	/** A cursor for elements coming before the current page. */
	before?: Maybe<Scalars['String']>;
};

export type User = {
	name: Scalars['String'];
	/** The document's ID. */
	_id: Scalars['ID'];
	avatarURL: Scalars['String'];
	tweets: TweetPage;
	/** The document's timestamp. */
	_ts: Scalars['Long'];
};

export type UserTweetsArgs = {
	_size?: Maybe<Scalars['Int']>;
	_cursor?: Maybe<Scalars['String']>;
};

/** The pagination object for elements of type 'User'. */
export type UserPage = {
	/** The elements of type 'User' in this page. */
	data: Array<Maybe<User>>;
	/** A cursor for elements coming after the current page. */
	after?: Maybe<Scalars['String']>;
	/** A cursor for elements coming before the current page. */
	before?: Maybe<Scalars['String']>;
};

export type CreateNewTweetMutationVariables = {
	author: Scalars['ID'];
	timestamp: Scalars['Time'];
	text: Scalars['String'];
};

export type CreateNewTweetMutation = {
	createTweet: Pick<Tweet, 'timestamp' | 'text'> & { id: Tweet['_id'] } & {
		author: Pick<User, 'name'> & { id: User['_id'] };
		likes?: Maybe<Array<{ id: User['_id'] }>>;
		replies?: Maybe<Array<{ id: Tweet['_id'] }>>;
	};
};

export type GetAllTweetsQueryVariables = {};

export type GetAllTweetsQuery = {
	allTweets: {
		data: Array<
			Maybe<
				Pick<Tweet, 'timestamp' | 'text'> & { id: Tweet['_id'] } & {
					author: Pick<User, 'name'> & { id: User['_id'] };
					likes?: Maybe<Array<{ id: User['_id'] }>>;
					replies?: Maybe<Array<{ id: Tweet['_id'] }>>;
				}
			>
		>;
	};
};

export type GetAllUsersQueryVariables = {};

export type GetAllUsersQuery = {
	allUsers: {
		data: Array<
			Maybe<
				Pick<User, 'name' | 'avatarURL'> & { id: User['_id'] } & {
					tweets: { data: Array<Maybe<{ id: Tweet['_id'] }>> };
				}
			>
		>;
	};
};

export type GetTweetByIdQueryVariables = {
	id: Scalars['ID'];
};

export type GetTweetByIdQuery = {
	findTweetByID?: Maybe<
		Pick<Tweet, 'timestamp' | 'text'> & { id: Tweet['_id'] } & {
			author: Pick<User, 'name'> & { id: User['_id'] };
			likes?: Maybe<Array<{ id: User['_id'] }>>;
			replies?: Maybe<Array<{ id: Tweet['_id'] }>>;
		}
	>;
};

export type RemoveTweetByIdMutationVariables = {
	id: Scalars['ID'];
};

export type RemoveTweetByIdMutation = {
	deleteTweet?: Maybe<
		Pick<Tweet, 'timestamp' | 'text'> & { id: Tweet['_id'] } & {
			author: Pick<User, 'name'> & { id: User['_id'] };
			likes?: Maybe<Array<{ id: User['_id'] }>>;
			replies?: Maybe<Array<{ id: Tweet['_id'] }>>;
		}
	>;
};

export type UpdateExistingTweetMutationVariables = {
	id: Scalars['ID'];
	author: Scalars['ID'];
	timestamp: Scalars['Time'];
	text: Scalars['String'];
	likes?: Maybe<Array<Scalars['ID']>>;
	replies?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateExistingTweetMutation = {
	updateTweet?: Maybe<
		Pick<Tweet, 'timestamp' | 'text'> & { id: Tweet['_id'] } & {
			author: Pick<User, 'name'> & { id: User['_id'] };
			likes?: Maybe<Array<{ id: User['_id'] }>>;
			replies?: Maybe<Array<{ id: Tweet['_id'] }>>;
		}
	>;
};

export const CreateNewTweet = gql`
	mutation createNewTweet($author: ID!, $timestamp: Time!, $text: String!) {
		createTweet(
			data: {
				author: { connect: $author }
				timestamp: $timestamp
				text: $text
				likes: []
				replies: []
			}
		) {
			author {
				id: _id
				name
			}
			timestamp
			id: _id
			text
			likes {
				id: _id
			}
			replies {
				id: _id
			}
		}
	}
`;
export const GetAllTweets = gql`
	query getAllTweets {
		allTweets {
			data {
				author {
					id: _id
					name
				}
				timestamp
				id: _id
				text
				likes {
					id: _id
				}
				replies {
					id: _id
				}
			}
		}
	}
`;
export const GetAllUsers = gql`
	query getAllUsers {
		allUsers {
			data {
				name
				avatarURL
				id: _id
				tweets {
					data {
						id: _id
					}
				}
			}
		}
	}
`;
export const GetTweetById = gql`
	query getTweetByID($id: ID!) {
		findTweetByID(id: $id) {
			author {
				id: _id
				name
			}
			timestamp
			id: _id
			text
			likes {
				id: _id
			}
			replies {
				id: _id
			}
		}
	}
`;
export const RemoveTweetById = gql`
	mutation removeTweetByID($id: ID!) {
		deleteTweet(id: $id) {
			author {
				id: _id
				name
			}
			timestamp
			id: _id
			text
			likes {
				id: _id
			}
			replies {
				id: _id
			}
		}
	}
`;
export const UpdateExistingTweet = gql`
	mutation updateExistingTweet(
		$id: ID!
		$author: ID!
		$timestamp: Time!
		$text: String!
		$likes: [ID!]
		$replies: [ID!]
	) {
		updateTweet(
			id: $id
			data: {
				author: { connect: $author }
				timestamp: $timestamp
				text: $text
				likes: $likes
				replies: $replies
			}
		) {
			author {
				id: _id
				name
			}
			timestamp
			id: _id
			text
			likes {
				id: _id
			}
			replies {
				id: _id
			}
		}
	}
`;
