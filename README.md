# UI-Twitter-TS

> TypeScript implementation of Twitter clone originally by [Tyler McGinnis](https://github.com/tylermcginnis/) with FaunaDB powered GraphQL backend. [Live demo](https://ui-twitter-ts.zweisolutions.com/)

### Added features:

-   GraphQL backend using FaunaDB and called using Netlify Functions (lambda/serverless).
-   Remove tweet functionality for authenticated user.

### Tech stack:

-   TypeScript
-   FaunaDB + GraphQL
-   Netlify Functions (Serverless/Lambda functions)
-   Apollo
-   GraphQL Code Generator
-   React + Redux
-   Create React App

### Live demo:

[Available at https://ui-twitter-ts.zweisolutions.com/](https://ui-twitter-ts.zweisolutions.com/)

### Instructions

1. Run `npm install` in the main directory (package.json should be accurate)
    - Special Notes:
        - Source/Dev: `src` folder
        - Production: `build` folder
        - Functions: `functions` folder
        - Compiled functions: `build-functions` folder
2. Link the local development environment to a Netlify site. Enable the FaunaDB addon. Create a new database in Fauna.
3. Run `npm run bootstrap` to upload the `masterSchema.gql` file in the `scripts` folder to Fauna (which will autogenerate a lot of GraphQL schema as well). This will then also upload some sample data to your new database.
4. Run one of the commands from the [Scripts](#scripts) section. You'll most likely want `npm run dev` for development and `npm run build` for production.

### Scripts

-   `npm run dev`: Create development build and serve it on dev server
-   `npm run build`: Build application for production (build directory: build)
-   `npm run start`: Start app without netlify development server. Will likely fail.
-   `npm run startWithoutMerge`: Same as above without merging the masterSchema file.
-   `npm run eject`: [See documentation here](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)
-   `npm run functionsBuild`: Will run `netlify-lambda` and build the TypeScript functions into the `build-functions` folder.
-   `npm run codegen`: Will generate GraphQL TypeScript bindings.
-   `npm run codegenWatch`: Same as above in watch mode.
-   `npm run mergeSchema`: Will merge the masterSchema file into Fauna.
-   `npm run bootstrap`: Will merge the masterSchema and upload sample data.

### Current TODOs:

-   Combine initial data fetch calls into one call
-   Implement authentication when Fauna implements GraphQL native bindings for it (can accomplish using resolvers in the meantime but out of the scope of this project)

### Dev notes

-   Using `@graphql-codegen/typescript-document-nodes` plugin for GraphQL Code Generator to allow easy importation of GraphQL AST code when bundling functions using `netlify-lambda`.
-   Function endpoints:
    -   `getTweets`: Will get tweets and convert to a Tweets type.
    -   `getUsers`: Will get users and convert to a Users type.
    -   `removeTweet`: Will remove tweet and update tweets it was replying to.
    -   `saveLikeToggle`: Will toggle like status on tweet.
    -   `saveTweet`: Will create a new Tweet with provided data.
-   Authed user is set in `src/actions/shared` to Tyler McGinnis.
-   When implementing proper user authentication in the future, care should be taken to check user authentication on the server side.
-   Babel configuration and `functions/shared/webpack.config.js` files are used purely for functions and not for client facing code.
-   No GraphQL caching is enabled since the Apollo calls are on the backend serverless functions.
-   Users are identified by Fauna ID rather than by the original strings.

## Available for Hire

I'm available for freelance, contracts, and consulting both remotely and in the Hudson Valley, NY (USA) area. [Some more about me](https://www.zweisolutions.com/about.html) and [what I can do for you](https://www.zweisolutions.com/services.html).

Feel free to drop me a message at:

```
hi [a+] zweisolutions {●} com
```

## License

[MIT](./LICENSE)
