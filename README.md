<p align="center">
  <a href="https://techwings.io" target="blank"><img src="https://tedonema-public.s3.eu-west-2.amazonaws.com/logos/techwings-io.png" width="320" alt="Techwings.io Logo" /></a>
</p>

  <h2 align="center">Template for Techwings.io API backends</p>

## Description

This template provides the following boilerplate capabilities:

- A Configuration Service ready to go. Please see below how to configure the _.env_ file
- A JWT service based on Passport and [Auth0](https://auth0.com)
- A Permissions Guard which protects APIs with the roles contained in the JWT token passed within the request
- A Shared Service for common functionality
- A pagination skeleton, to handle paginated data
- A boilerplate controller, with an unsecure and a secure endpoint
- A boilerplate service
- Typeorm dependencies
- A boilerplate docker configuration

## Installation

```bash
$ npm install
```

## Running the app

Before running the app, please create a _.env_ file with the following properties:

```
PORT=3000
AUTH0_AUDIENCE="<your Auth0 audience>"
AUTH0_DOMAIN="<your Auth0 domain>"
AUTH0_ISSUER_URL="<your Auth0 issuer URL>"
AUTH0_ADMIN_API_CLIENT_ID="<your Auth0 Admin API client ID>"
AUTH0_ADMIN_API_CLIENT_SECRET='<your Auth0 Admin API client Secret>'
JWT_NS_PREFIX="<your Auth0 Namespace prefix, if you've set one up>"
```

If you want help understanding how the configuration works, you can refer to [this knowledge article.](https://techwings.io/about/the-journey-to-feedback-pal/)

Once you have setup the _.env_ file, to start the app, run:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

This template is a MIT-licensed open source project. It can grow thanks to you.

## Stay in touch

- Author - [Marco Tedone](https://techwings.io/about)
- Website - [https://techwings.io](https://techwings.io/)
- Twitter - [@marcotedone](https://twitter.com/marcotedone)

## License

This template is [MIT licensed](LICENSE).
