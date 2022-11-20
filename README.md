## Introduction
A2N Finance allows user to create subscription products & use crypto recurring payment features. This demo app works on Bitorrent chain. BTT, USDT & TRX are three supported tokens. Supported token list will be extended later.

To test this app, you need to install Metamask wallet. You can fund your test account at [BTT Faucet](https://faucet.bittorrentchain.io/#/)

**Demo:** [A2N finance dApp](https://app.a2n.finance)

**Smart Contract:** [Verified A2N Smart Contract](https://testnet.bttcscan.com/address/0x06b1D06b7faaEA8045788F9910b084Fa2C766a6D#code)

## Features
- [x] Deposit.
- [x] Create subscription product.
- [x] Subscribe product.
- [x] Automation System.
- [x] Connect wallet.
- [x] Withdraw
- [x] View balance.
- [x] Cancel Subscription.
- [x] View subscriptions.
- [x] View subscribers.
- [x] Manage profile.
- [x] Show all subscription products.
- [x] Show all service/product providers.
- [x] View product details & related products.
- [x] Manage refund requests.
- [x] Integrate button "Subscribe" to Web 3 application with API/SDK.
- [x] Reports & Statistics.
- [ ] Pause subscription.
- [ ] Reactive subscription.
- [ ] Stop/Delete subscription product.
- [ ] Support other BRC-20 tokens.
- [ ] Support Tron Network
- [ ] Support BNB chain.
- [ ] Support WooCommerce
- [ ] Support Shopify
- [ ] Support BigCommerce


## TechStack

### To build smart contract, we use:

- Solidity 0.8.x
- Open Zeppelin
- Truffle

There are interfaces: IUser, ISubscriber, IAdmin, ISystem and IA2N.

![smart contract](public/docs/smart_contract.jpg)

### To build dApp front-end, we use:

- NodeJS, React 18.2 & NextJS 12.3
- Redux & Redux Toolkit 8.0
- Chakra UI components
- Ethers JS & Web3 JS
- Cloud DB
- Metamask API.
- Typescript 4.8
### To test smart contract:
- Mocha & Jest
### To build A2N finance API/SDK:
- NodeJS
- Ethers JS
- Typescript
- Webpack.

## Architecture

![a2n finance dApp](public/docs/simple_architecture.jpg)

- Frontend (UI/UX): use NextJS and Chakra UI components.
- Data Handler: read/write cloud database
- Smart contract interaction: use EthersJS to send transactions.
- Wallet Connector: use Metamask API to connect wallet.
- Automation System: get due date subscription & do mass transactions automatically.


## References

- [EIP-1337](https://eips.ethereum.org/EIPS/eip-1337)
- [EIP-5643](https://eips.ethereum.org/EIPS/eip-5643)
- [Ethereum Recurring Payment](https://github.com/Jon-Becker/Ethereum-Recurring-Payments)
- [Crypto Subscription Payment](https://www.reliabills.com/blog/crypto-subscription-payments/)

## How to deploy
- Copy .env.example and rename to .env
- Install truffle: `npm install -g truffle`
- Change settings: create .env file, add database URL & private key to deploy.
- Deploy Smart contract: `truffle migrate --network bttctest`
- Copy your contract address to .env file.
- Verify Smart contract: `truffle run verify A2N --network bttctest`
- Run dApp on Dev Mode: `npm run dev`
- Run dApp on Production Mode: `npm run build & npm run start`
- To run scheduled task: `npm run jobs`
- To compile SDK: `npm run compile-sdk`

## Screenshots
### Homepage

![home page](public/demo/homepage.png)

### Product page

![product page](public/demo/productpage.png)

### Dashboard - dark mode

![dashboard dark mode](public/demo/dashboard_dark_mode.png)

### Dashboard - light mode

![dashboard_light_mode](public/demo/dashboard_light_mode.png)

### My Products Page

![My Products](public/demo/userproducts.png)

### My Subscriptions Page

![My Subscriptions](public/demo/my_subscriptions.png)

### My Subscribers Page

![My Subscribers](public/demo/my_subscribers.png)

### Create Product Page

![Create Product](public/demo/create_product.png)

### Deposit

![Deposit](public/demo/deposit.png)

### Balances

![Balances](public/demo/balances.png)

### Refund Requests

![Refund Requests](public/demo/refund_requests.png)

### My Profile

![My Profile](public/demo/my_profile_page.png)



