# Coinflip Alerts dAPP 🚨

## About

This dAPP is a demo on setting custom Telegram alerts for the largest the Polygon/MATIC Casino dAPP.
Each user can sign using Unstoppable domains, set their own Telegram Bot API data, MATIC bet threshold.

A demo showcase is a Telegram Bot pushing notifications to a Telegram channel whenever any user sends more or equal to a defined numeber of MATIC tokens.

Initial forked from: https://github.com/ashbeech/moralis-whale-alerts.git
Built on [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html) a ReactJS front-end with a Moralis backend and Unstoppable Domains integration.

## Quick Launch 🚀

Via terminal, navigate to root directory:

```sh
npm install

```

Go to [Moralis.io](https://moralis.io/) to create your server instance.
In the root directory of your code base create a `.env` file containing the moralis servers' enviroment variables:

```sh
REACT_APP_MORALIS_APPLICATION_ID=xxx
REACT_APP_MORALIS_SERVER_URL=https://xxx.bigmoralis.com:2053/server

```

Install Moralis admin client:

```sh
npm install -g moralis-admin-cli

```

This will allow you to sync Moralis Cloud Functions in [CloudFile](src/Cloud/CloudFile.js):

```sh
moralis-admin-cli watch-cloud-file --moralisApiKey xxx --moralisApiSecret xxx --moralisSubdomain xxx.moralisweb3.com --autoSave 1 --moralisCloudfolder /xxx/moralis-whale-alerts/src/Cloud

```

Finally provide your path to the [CloudFile](src/Cloud/CloudFile.js) and sync with Moralis server instance:

```sh
/xxx/moralis-whale-alerts/src/Cloud/CloudFile.js

```

Once installed and synced with your Moralis server instance, in the project directory run:

```sh
npm start

```
=======
