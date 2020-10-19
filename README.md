# jovo-starter-web-chatwidget

## Installation

1. Install the dependencies in both packages:

   Run `npm i` or `npm install` in `app` and `client`.

2. Prepare the Client:

   Set the `url` in `client/src/main.ts` to the url of your endpoint.

3. Prepare the App:

   The [WebPlatform](https://www.jovo.tech/marketplace/jovo-platform-web) itself does not have any ASR-, or NLU-capabilities, instead other integrations take care of these tasks.\
   For this starter, [LexSlu](https://www.jovo.tech/marketplace/jovo-slu-lex) was chosen because it handles both ASR and NLU.
   You can choose any other integration(s) to handle ASR and NLU.\
   Visit the [Jovo Marketplace](https://www.jovo.tech/marketplace) for more information.

   > If you decide to use LexSlu, you will have to provide a name and an alias of the Lex-bot, as well as Amazon-credentials.

## Usage

1. Start the Jovo-App in `app`:

   ```
   npm run start:dev
   ```

2. Start the Web-App in `client`:

   ```
   npm run serve
   ```

The Web-App is now running at http://localhost:8080 and ready to be used.
