# Jovo Web Starter: Chat Widget

Fully customizable open source chat widget that can be added to any website.

Built with the [Jovo Framework](https://github.com/jovotech/jovo-framework), [Vue.js](https://github.com/vuejs/vue), and [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss).

Demo: [jovo.tech/demos/starter-web-chatwidget](https://www.jovo.tech/demos/starter-web-chatwidget/).

![Jovo Chat Widget](./img/starter-web-chatwidget.gif)

> Support Jovo by starring [our main repo](https://github.com/jovotech/jovo-framework) or joining [our Open Collective](https://opencollective.com/jovo-framework).

- [Getting Started](#getting-started)
- [How it works](#how-it-works)
- [Customization](#customization)
  - [Client](#client)
  - [App](#app)
- [About Jovo](#about-jovo)

## Getting Started

1.  **Download starter**

    Use the Jovo CLI to create a new project based on this starter:

    ```sh
    # Install latest version of the Jovo CLI
    $ npm i -g jovo-cli

    # This will download the template and install the dependencies
    $ jovo new my-chatwidget --template starter-web-chatwidget

    $ cd my-chatwidget
    ```
    Alternatively, you can clone this repository and run `npm install`.


2. **Start client (Vue.js)**
   ```sh
    $ cd client

    # Start Vue frontend
    $ npm run serve
    ```
3. **Start app (Jovo)**
    In a new tab:

    ```sh
    $ cd app

    # Start Jovo development server
    $ jovo run
    ```
    The first time, `jovo run` will compile the TypeScript code. After making changes, make sure to compile with `npm run tsc` and then start the Jovo development server again.

4. **Open the starter in your browser at `http://localhost:8080`.**

## How it works

![Jovo Web Client to App](img/jovo-web-client-to-app.png)

This repository contains:
* `app`: Backend logic built with the [Jovo Framework](https://github.com/jovotech/jovo-framework) using its [Web Platform integration](https://github.com/jovotech/jovo-framework/tree/master/jovo-platforms/jovo-platform-web).
* `client`: Frontend built with [Vue.js](https://vuejs.org/) and [Tailwind CSS](https://tailwindcss.com/), communicating with the backend using the [Jovo Web Client for Vue.js](https://github.com/jovotech/jovo-framework/tree/master/jovo-clients/jovo-client-web-vue).



## Customization

The starter was built for you to have a working example as well as an entry point to get started with the Jovo Web integration.

The following documentation will help you understand how the starter is structured and which components take care of which tasks.

### Client

The client is a Vue.js project that consists of a single component "ChatWidget" which is styled in Tailwind CSS.

#### Component: ChatWidget

The ChatWidget component implements a fully functioning chat body where the user can type in their request and receive a response from the Jovo app. handles the registration for multiple event listeners, namely `ClientEvent.Request`, `ClientEvent.Response`, and `ClientEvent.Action`.

TODO: add links to docs and more info
* `ClientEvent.Request`: triggered before the request is sent out to the Jovo app. In this case, it is used to display the user's input in the chat body.
* `ClientEvent.Response`: triggered when the client receives the Jovo app's response. In this case, it is used to display the app's response in the chat body.
* `ClientEvent.Action`: triggered when the app's response contains an action. In our case, we expect quick replies that are displayed as buttons on top of text input. It also listens for a custom action that opens a link to a new tab.

### App

The Jovo app the new [Jovo Web Platform integration](http://jovo.tech/marketplace/jovo-platform-web) as well as [NLP.js](https://www.jovo.tech/marketplace/jovo-nlu-nlpjs) as its NLU. It implements a simple interaction where the user can be redirected to the Jovo Framework's documentation.

#### Language Model

The language model consists of two intents, `HelloWorldIntent` and `YesIntent`, used to implement the sample interaction.

#### app.ts

The `app.ts` file contains the initialization of the app and its plugins as well as the basic logic for the sample interaction. It makes use of the Web integrations `Custom Actions` to send a `redirect` action used to open a link in a new tab.

## About Jovo

Jovo is the most popular development framework for voice, including platforms like Alexa, Google Assistant, and the web.

-   [Jovo Website](https://jovo.tech/)
-   [Documentation](https://jovo.tech/docs/)
-   [Marketplace](https://www.jovo.tech/marketplace/)
-   [Twitter](https://twitter.com/jovotech/)
-   [Forum](https://community.jovo.tech/)