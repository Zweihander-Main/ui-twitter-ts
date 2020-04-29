# UI-Twitter-TS

> TypeScript implementation of Twitter clone originally by Tyler McGinnis with some useful additions. [tylermcginnis](https://github.com/tylermcginnis/). [Live demo](https://ui-twitter-ts.zweisolutions.com/)

### Added features:

-

### Tech stack:

-   TypeScript
-   React
-   Redux

### Live demo:

[Available at https://ui-twitter-ts.zweisolutions.com/](https://ui-twitter-ts.zweisolutions.com/)

### Instructions

1. Run `npm install` in the main directory (package.json should be accurate)
    - Special Notes:
    - Source/Dev: src folder, Production: build folder
2. Run one of the commands from the [Scripts](#scripts) section. You'll most likely want `npm run start` for development and `npm run build` for production.

### Scripts

-   `npm run start`: Create development build and serve it on dev server
-   `npm run build`: Build application for production (build directory: build)
-   `npm run test`: Launch test runner in interactive watch mode
-   `npm run eject`: [See documentation here](https://create-react-app.dev/docs/available-scripts/#npm-run-eject)

### Current TODOs:

-   Combine initial data fetch calls into one call
-   Implement authentication when Fauna implements GraphQL native bindings for it (can accomplish using resolvers in the meantime but out of the scope of this project)

### Dev notes

-   Using `@graphql-codegen/typescript-document-nodes` plugin for GraphQL Code Generator to allow easy importation of GraphQL AST code when bundling functions using `netlify-lambda`.

## Available for Hire

I'm available for freelance, contracts, and consulting both remotely and in the Hudson Valley, NY (USA) area. [Some more about me](https://www.zweisolutions.com/about.html) and [what I can do for you](https://www.zweisolutions.com/services.html).

Feel free to drop me a message at:

```
hi [a+] zweisolutions {●} com
```

## License

[MIT](./LICENSE)
