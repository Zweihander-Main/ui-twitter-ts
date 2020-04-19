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
   __typename?: 'Mutation';
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
  saveTweet: Tweet;
  saveLikeToggle: Tweet;
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


export type MutationSaveTweetArgs = {
  text: Scalars['String'];
  author: Scalars['String'];
  replyingTo?: Maybe<Scalars['String']>;
};


export type MutationSaveLikeToggleArgs = {
  id: Scalars['ID'];
  hasLiked: Scalars['Boolean'];
  authedUser: Scalars['ID'];
};

/** 'Tweet' input values */
export type TweetInput = {
  author: Scalars['String'];
  timestamp: Scalars['Time'];
  text: Scalars['String'];
  likes?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  replyingTo?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Scalars['String']>>;
};

/** 'User' input values */
export type UserInput = {
  name: Scalars['String'];
  id: Scalars['ID'];
  avatarURL: Scalars['String'];
  tweets?: Maybe<Array<Scalars['String']>>;
};

export type Query = {
   __typename?: 'Query';
  /** Find a document from the collection of 'Tweet' by its id. */
  findTweetByID?: Maybe<Tweet>;
  /** Find a document from the collection of 'User' by its id. */
  findUserByID?: Maybe<User>;
  allUsers: UserPage;
  allTweets: TweetPage;
};


export type QueryFindTweetByIdArgs = {
  id: Scalars['ID'];
};


export type QueryFindUserByIdArgs = {
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
   __typename?: 'Tweet';
  author: Scalars['String'];
  timestamp: Scalars['Time'];
  /** The document's ID. */
  _id: Scalars['ID'];
  text: Scalars['String'];
  likes?: Maybe<Array<Scalars['String']>>;
  id: Scalars['ID'];
  replyingTo?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Scalars['String']>>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'Tweet'. */
export type TweetPage = {
   __typename?: 'TweetPage';
  /** The elements of type 'Tweet' in this page. */
  data: Array<Maybe<Tweet>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};

export type User = {
   __typename?: 'User';
  name: Scalars['String'];
  /** The document's ID. */
  _id: Scalars['ID'];
  id: Scalars['ID'];
  avatarURL: Scalars['String'];
  tweets?: Maybe<Array<Scalars['String']>>;
  /** The document's timestamp. */
  _ts: Scalars['Long'];
};

/** The pagination object for elements of type 'User'. */
export type UserPage = {
   __typename?: 'UserPage';
  /** The elements of type 'User' in this page. */
  data: Array<Maybe<User>>;
  /** A cursor for elements coming after the current page. */
  after?: Maybe<Scalars['String']>;
  /** A cursor for elements coming before the current page. */
  before?: Maybe<Scalars['String']>;
};



