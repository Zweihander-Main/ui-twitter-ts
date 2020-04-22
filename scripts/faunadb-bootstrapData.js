/* eslint-disable no-console, quotes, @typescript-eslint/camelcase, @typescript-eslint/no-var-requires, @typescript-eslint/explicit-function-return-type*/

/**
 * Script to bootstrap data into FaunaDB using GQL.
 * Already assumes schema is uploaded.
 */

const users = {
	sarah_edo: {
		id: 'sarah_edo',
		name: 'Sarah Drasner',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
		tweets: [
			'8xf0y6ziyjabvozdd253nd',
			'hbsc73kzqi75rg7v1e0i6a',
			'2mb6re13q842wu8n106bhk',
			'6h5ims9iks66d4m7kqizmv',
			'3sklxkf9yyfowrf0o1ftbb',
		],
	},
	tylermcginnis: {
		id: 'tylermcginnis',
		name: 'Tyler McGinnis',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
		tweets: [
			'5c9qojr2d1738zlx09afby',
			'f4xzgapq7mu783k9t02ghx',
			'nnvkjqoevs8t02lzcc0ky',
			'4pt0px8l0l9g6y69ylivti',
			'fap8sdxppna8oabnxljzcv',
			'leqp4lzfox7cqvsgdj0e7',
			'26p5pskqi88i58qmza2gid',
			'xi3ca2jcfvpa0i3t4m7ag',
		],
	},
	dan_abramov: {
		id: 'dan_abramov',
		name: 'Dan Abramov',
		avatarURL: 'https://tylermcginnis.com/would-you-rather/dan.jpg',
		tweets: [
			'5w6k1n34dkp1x29cuzn2zn',
			'czpa59mg577x1oo45cup0d',
			'omdbjl68fxact38hk7ypy6',
			'3km0v4hf1ps92ajf4z2ytg',
			'njv20mq7jsxa6bgsqc97',
			'sfljgka8pfddbcer8nuxv',
			'r0xu2v1qrxa6ygtvf2rkjw',
		],
	},
};

const tweets = {
	'8xf0y6ziyjabvozdd253nd': {
		id: '8xf0y6ziyjabvozdd253nd',
		text:
			"Shoutout to all the speakers I know for whom English is not a first language, but can STILL explain a concept well. It's hard enough to give a good talk in your mother tongue!",
		author: 'sarah_edo',
		timestamp: 1518122597860,
		likes: ['tylermcginnis'],
		replies: ['fap8sdxppna8oabnxljzcv', '3km0v4hf1ps92ajf4z2ytg'],
		replyingTo: null,
	},
	'5c9qojr2d1738zlx09afby': {
		id: '5c9qojr2d1738zlx09afby',
		text:
			'I hope one day the propTypes pendulum swings back. Such a simple yet effective API. Was one of my favorite parts of React.',
		author: 'tylermcginnis',
		timestamp: 1518043995650,
		likes: ['sarah_edo', 'dan_abramov'],
		replies: ['njv20mq7jsxa6bgsqc97'],
		replyingTo: null,
	},
	f4xzgapq7mu783k9t02ghx: {
		id: 'f4xzgapq7mu783k9t02ghx',
		text:
			'Want to work at Facebook/Google/:BigCompany? Start contributing code long before you ever interview there.',
		author: 'tylermcginnis',
		timestamp: 1517043995650,
		likes: ['dan_abramov'],
		replies: [],
		replyingTo: null,
	},
	hbsc73kzqi75rg7v1e0i6a: {
		id: 'hbsc73kzqi75rg7v1e0i6a',
		text: 'Puppies 101: buy a hamper with a lid on it.',
		author: 'sarah_edo',
		timestamp: 1516043995650,
		likes: ['tylermcginnis'],
		replies: ['leqp4lzfox7cqvsgdj0e7', 'sfljgka8pfddbcer8nuxv'],
		replyingTo: null,
	},
	'5w6k1n34dkp1x29cuzn2zn': {
		id: '5w6k1n34dkp1x29cuzn2zn',
		text:
			'Is there a metric like code coverage, but that shows lines that, if changed (in a syntactically correct way), wouldn’t cause tests to fail?',
		author: 'dan_abramov',
		timestamp: 1515043995650,
		likes: ['sarah_edo'],
		replies: [],
		replyingTo: null,
	},
	czpa59mg577x1oo45cup0d: {
		id: 'czpa59mg577x1oo45cup0d',
		text:
			"React came out 'rethinking best practices'. It has since accumulated 'best practices' of its own. Let’s see if we can do better.",
		author: 'dan_abramov',
		timestamp: 1515043995650,
		likes: ['tylermcginnis', 'sarah_edo'],
		replies: ['3sklxkf9yyfowrf0o1ftbb'],
		replyingTo: null,
	},
	'2mb6re13q842wu8n106bhk': {
		id: '2mb6re13q842wu8n106bhk',
		text:
			'I think I realized I like dogs so much because I can really relate to being motivated by snacks',
		author: 'sarah_edo',
		timestamp: 1514043995650,
		likes: ['dan_abramov'],
		replies: ['26p5pskqi88i58qmza2gid'],
		replyingTo: null,
	},
	nnvkjqoevs8t02lzcc0ky: {
		id: 'nnvkjqoevs8t02lzcc0ky',
		text:
			'Maybe the real benefit of open source was the friendships we made along the way?',
		author: 'tylermcginnis',
		timestamp: 1513043995650,
		likes: [],
		replies: [],
		replyingTo: null,
	},
	omdbjl68fxact38hk7ypy6: {
		id: 'omdbjl68fxact38hk7ypy6',
		text:
			'A 7-minute Paul Joseph Watson video being translated and aired by a Russian state TV channel is the most surreal thing I’ve seen in 2018 yet',
		author: 'dan_abramov',
		timestamp: 1512043995650,
		likes: [],
		replies: [],
		replyingTo: null,
	},
	'4pt0px8l0l9g6y69ylivti': {
		id: '4pt0px8l0l9g6y69ylivti',
		text:
			'Talking less about the downsides of OSS and focusing on some of the huge potential upsides for once might just help get more people into it.',
		author: 'tylermcginnis',
		timestamp: 1511043995650,
		likes: ['dan_abramov'],
		replies: [],
		replyingTo: null,
	},
	'6h5ims9iks66d4m7kqizmv': {
		id: '6h5ims9iks66d4m7kqizmv',
		text:
			"By the way, if you have a blog post sitting around and want to get some eyes on it, we take guest submissions! That's how I started.",
		author: 'sarah_edo',
		timestamp: 1510043995650,
		likes: ['dan_abramov', 'tylermcginnis'],
		replies: ['xi3ca2jcfvpa0i3t4m7ag', 'r0xu2v1qrxa6ygtvf2rkjw'],
		replyingTo: null,
	},
	fap8sdxppna8oabnxljzcv: {
		id: 'fap8sdxppna8oabnxljzcv',
		author: 'tylermcginnis',
		text:
			"I agree. I'm always really impressed when I see someone giving a talk in a language that's not their own.",
		timestamp: 1518122677860,
		likes: ['sarah_edo'],
		replyingTo: '8xf0y6ziyjabvozdd253nd',
		replies: [],
	},
	'3km0v4hf1ps92ajf4z2ytg': {
		id: '3km0v4hf1ps92ajf4z2ytg',
		author: 'dan_abramov',
		text: 'It can be difficult at times.',
		timestamp: 1518122667860,
		likes: [],
		replyingTo: '8xf0y6ziyjabvozdd253nd',
		replies: [],
	},
	njv20mq7jsxa6bgsqc97: {
		id: 'njv20mq7jsxa6bgsqc97',
		author: 'dan_abramov',
		text: 'Sometimes you have to sacrifice simplicity for power.',
		timestamp: 1518044095650,
		likes: ['tylermcginnis'],
		replyingTo: '5c9qojr2d1738zlx09afby',
		replies: [],
	},
	leqp4lzfox7cqvsgdj0e7: {
		id: 'leqp4lzfox7cqvsgdj0e7',
		author: 'tylermcginnis',
		text: 'Also trashcans. Learned this the hard way.',
		timestamp: 1516043255650,
		likes: [],
		replyingTo: 'hbsc73kzqi75rg7v1e0i6a',
		replies: [],
	},
	sfljgka8pfddbcer8nuxv: {
		id: 'sfljgka8pfddbcer8nuxv',
		author: 'dan_abramov',
		text: 'Puppies are the best.',
		timestamp: 1516045995650,
		likes: ['sarah_edo', 'tylermcginnis'],
		replyingTo: 'hbsc73kzqi75rg7v1e0i6a',
		replies: [],
	},
	'3sklxkf9yyfowrf0o1ftbb': {
		id: '3sklxkf9yyfowrf0o1ftbb',
		author: 'sarah_edo',
		text:
			'The idea of best practices being a negative thing is an interesting concept.',
		timestamp: 1515044095650,
		likes: ['dan_abramov'],
		replyingTo: 'czpa59mg577x1oo45cup0d',
		replies: [],
	},
	'26p5pskqi88i58qmza2gid': {
		id: '26p5pskqi88i58qmza2gid',
		author: 'tylermcginnis',
		text: 'Too relatable',
		timestamp: 1514044994650,
		likes: ['sarah_edo'],
		replyingTo: '2mb6re13q842wu8n106bhk',
		replies: [],
	},
	xi3ca2jcfvpa0i3t4m7ag: {
		id: 'xi3ca2jcfvpa0i3t4m7ag',
		author: 'tylermcginnis',
		text: 'Just DMd you!',
		timestamp: 1510043995650,
		likes: [],
		replyingTo: '6h5ims9iks66d4m7kqizmv',
		replies: [],
	},
	r0xu2v1qrxa6ygtvf2rkjw: {
		id: 'r0xu2v1qrxa6ygtvf2rkjw',
		author: 'dan_abramov',
		text: 'This is a great idea.',
		timestamp: 1510044395650,
		likes: ['tylermcginnis'],
		replyingTo: '6h5ims9iks66d4m7kqizmv',
		replies: [],
	},
};

(() => {
	const ApolloClient = require('apollo-boost').default;
	const gql = require('graphql-tag');
	const fetch = require('node-fetch');

	const URL = 'https://graphql.fauna.com/graphql';

	const client = new ApolloClient({
		uri: URL,
		fetch,
		request: (operation) => {
			operation.setContext({
				headers: {
					Authorization: `Bearer ${process.env.FAUNADB_SERVER_SECRET}`,
				},
			});
		},
	});

	function executeMutation(mutation) {
		return client
			.mutate({ mutation })
			.then((results) => {
				console.log(results);
				return results.data;
			})
			.catch((e) => console.log(e));
	}

	async function populateUsersAndTweets() {
		const keys = Object.keys(users);
		const localTweets = Object.values(tweets);
		for (let i = 0; i < keys.length; i++) {
			const userKey = keys[i];
			const user = users[userKey];
			const { name, avatarURL, tweets: userTweets } = user;
			let tweetsString = '';
			for (let j = 0; j < userTweets.length; j++) {
				const tweetID = userTweets[j];
				const tweet = tweets[tweetID];
				const { text, timestamp } = tweet;
				tweetsString += `{
					timestamp: "${new Date(timestamp).toISOString()}",
					text: "${text}",
					likes: []
					replies: []
				}`;
				if (j !== userTweets.length) {
					tweetsString += ',';
				}
			}

			const mutation = gql`
				mutation {
					createUser(
						data: { name: "${name}", avatarURL: "${avatarURL}", tweets: {create: [${tweetsString}]} }
					) {
						name
						_id
						tweets {
							data {
								_id
								text
								timestamp
							}
						}
					}
				}
			`;
			const toSaveGQL = await executeMutation(mutation);
			users[userKey].gql = toSaveGQL.createUser;
			users[userKey].gql.tweets.data.forEach((tweetObject) => {
				const localMatched = localTweets.find(
					(localTweet) => localTweet.text === tweetObject.text
				);
				tweets[localMatched.id].gql = tweetObject;
			});
		}
	}

	//likes and replies
	async function populateTweets() {
		const keys = Object.keys(tweets);
		for (let i = 0; i < keys.length; i++) {
			const tweet = tweets[keys[i]];
			const { replies, likes, gql: tweetGql } = tweet;

			let likesString = '';
			for (let j = 0; j < likes.length; j++) {
				const likedUser = users[likes[j]];
				likesString += `"${likedUser.gql._id}"`;
				if (j !== likes.length) {
					likesString += ',';
				}
			}

			let repliesString = '';
			for (let j = 0; j < replies.length; j++) {
				const repliedTweet = tweets[replies[j]];
				repliesString += `"${repliedTweet.gql._id}"`;
				if (j !== replies.length) {
					repliesString += ',';
				}
			}

			const mutation = gql`
				mutation {
					updateTweet(
						id: "${tweetGql._id}", data: {
							timestamp: "${tweetGql.timestamp}"
							text: "${tweetGql.text}"
							likes: [${likesString}]
							replies: [${repliesString}]
						}
					) {
						_id
					}
				}
			`;

			console.log(mutation);

			await executeMutation(mutation);
		}
	}

	async function sequence() {
		await populateUsersAndTweets();
		await populateTweets();
	}

	sequence();
})();
