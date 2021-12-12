# Introduction

This demo project which will use the Polygon network comes with two ready made contracts to make getting started a bit easier. If you have never created a smart contract before don't worry this guide will walk you through compiling and deploying the smart contracts on your localhost and on the Mumbai testnet using Hardhat and Infura.

Hardhat is an Ethereum development environment that makes it easy to compile and run your contracts on a development network. Infura will also be utilised deploy contracts to the Polygon testnet and to save NFT metadata and assets using IPFS. No actual currency (MATIC) will be needed for this demo. The Hardhat development environment provides funded wallet addresses on localhost and we will use a testnet faucet to obtain MATIC for use on the Mumbai test network.

To use a distributed application using web3 technologies you will need to install a crypto wallet in your browser. This will be used not only for performing crypto transactions but for sign-in authentication. If you have not installed Metamask, please proceed to install for Chrome if you would like to continue with this demo:

https://metamask.io/download

Firstly we will setup the sample project source code, then proceed to deploy to the local blockchain provided by Hardhat and finally test the application. Once this is complete we will deploy the contracts to the Polygon Testnet and update the application to run against this blockchain. Within the Architected back end service we will make use of two logical environments provided with your Architected application so that we can run a 'development' version of the app running against your local blockchain and a 'uat' version instance of the app running against Mumbai Testnet. This will demonstrate how you can manage configuration and settings across environments and isolate the data silos from each other.

Before continuing please ensure you have created both an account and an application within the Architected management portal. If you have not done this instructions can be found here:

- [Create an account](https://github.com/Architected/next-js-sample-app/wiki/2-Creating-an-account)
- [Create your first application](https://github.com/Architected/next-js-sample-app/wiki/4-Creating-an-application)

# Local Blockchain Setup

## 1 Setup source code

### 1.1 Clone Repo

Open a cmd prompt and run the following commands to clone the project and launch the project in vscode:

```
git clone https://github.com/Architected/next-js-sample-app.git
cd next-js-sample-app
code .
```

### 1.2 Install packages

Within Visual Studio Code open a new terminal from the Terminal menu and run the following command to install project dependancies.

```
npm install
```

### 1.3 Configure settings

In the project root create a file call **.env.local** and copy the contents of **.env.template.dapp** into it.

These settings are all the environment variables that you will need to run the application.

The contents of **.env.local** should similar to this

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="dapp"
NEXT_PUBLIC_SITE_NAME="your-app-name"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
NEXT_PUBLIC_CHAIN_ID="0x539"
NEXT_PUBLIC_CHAIN_NAME=""
NEXT_PUBLIC_CHAIN_URL=""
NEXT_PUBLIC_NFT_ADDRESS="your-nft-contract-address"
NEXT_PUBLIC_MARKET_ADDRESS="your-market-contract-address"
```

Note: NextJs uses the convention prefix NEXT_PUBLIC for environment variables that must be available to client code running in the browser. Therefore API_KEY, API_SECRET are only accessible from back end code running on the server.

### 1.4 Configure public settings

Your application has two client environments to operate in, dev and uat, each with their own settings and secrets. (Note the alpha environment only has trial plans for the time being).

Ensure that the selected environment is 'Development' as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/env-select.png" width="800">

Next ensure that the Details tab is selected.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/details-tab.png" width="800">

From this tab make a note of the following values and update the respective settings in env.local:

- **Application Key** maps to **NEXT_PUBLIC_APP_KEY**
- **Api Url** maps to **NEXT_PUBLIC_API_URL**
- **Application Name** maps to **NEXT_PUBLIC_SITE_NAME**

Additional setting to configure include

NEXT_PUBLIC_APP_ENV equal to **dev**
NEXT_PUBLIC_SITE_MODE equal to **dapp**
NEXT_PUBLIC_CHAIN_ID equal to **0x539**
NEXT_PUBLIC_CHAIN_NAME equal to **Hardhat**

The public settings in env.local should now look something like this:

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://dz-api-dev-clnt-au.diztribute.com/api/v1.0/"
NEXT_PUBLIC_SITE_NAME="your-app-name"
NEXT_PUBLIC_APP_ENV="dev"
NEXT_PUBLIC_SITE_MODE="dapp"
NEXT_PUBLIC_CHAIN_ID="0x539"
NEXT_PUBLIC_CHAIN_NAME="Hardhat"
NEXT_PUBLIC_CHAIN_URL=""
NEXT_PUBLIC_NFT_ADDRESS="your-nft-contract-address"
NEXT_PUBLIC_MARKET_ADDRESS="your-market-contract-address"
```

We will determine the contract addresses later in section x.x

### 1.5 Configure private settings

Navigate to the Application Tokens tab.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/token-tab.png" width="800">

This will allow you to configure the following keys:

- api key maps to API_KEY
- api secret maps to API_SECRET

The private settings should look something like this:

```
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

## 2 Blockchain Setup

## 2.1 Start hardhat environment

Firstly we will start the local blockchain environment provided by Hardhat. In a new terminal window use the following command.

```
npx hardhat node
```

This will start your local blockchain and provide you with 20 accounts containing currency for you to use.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-1-hardhat-node.png" width="800">

Be aware of the message

```
WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

These accounts are static and publicly known so only use these for testing purposes.

## 2.2 Add test account to metamask

From the previous step we will use the first two accounts and add them to Metamask. With Metamask open click the 'My Accounts' icon in the top RHS and then proceed to select 'Import Account'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-1-import-account.png" width="300">

For account #0 paste the private key and click 'Import'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-2-import-account.png" width="300">

To rename the account click the 'Account Options' icon and select 'Account Details'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-3-import-account.png" width="300">

Proceed to rename the account to Hardhat #0 and save.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-4-import-account.png" width="300">

Repeat the process for Account #1

This will give us to two test accounts in Metamask that will allow us to simulate having a different buyer and seller.

## 2.3 Deploying contracts

The file ./scripts/deploy.js is used by Hardhat to compile the two contracts in the project and deploy them to the local blockchain running.

To do this, in another terminal window run the following command to deploy the contracts. Note the --network switch instructs hardhat where to deploy the contracts which for now will be localhost.

```
npx hardhat run scripts/deploy.js --network localhost
```

You should see output similar to the below screenshot

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-3-1-deploy-contracts.png" width="800">

Make a note of the two contract addresses created.

In your **.env.local** file update the values for the following properties:

NEXT_PUBLIC_NFT_ADDRESS="[value for NFT]"

NEXT_PUBLIC_MARKET_ADDRESS="[value for NFTMarket]"

After compilation you should see a new folder created called **artifacts**. This contains the compiled contracts referenced in the project code (see ./helper/contractHelper.js). This provides access to the smart contract ABI's which are used to reference contract operations. The ABI, Application Binary Interface, is used to invoke functions in a contract and return data back.

## 3 Testing

Now that the smart contracts have been deployed to a local running blockchain we are ready to test the application functionality

### 3.1 Launch Application

In a separate terminal window run the command below to start the project

```
npm run dev
```

The homepage displayed is different to the 'app' version in the previous tutorial and should look like this:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-1-launch.png" width="800">

If you see the previous homepage double check that the following setting has been applied:

```
NEXT_PUBLIC_SITE_MODE="dapp"
```

Next click on the Metamask icon and make sure the localhost network is selected in the drop down list. The first time you launch that app on localhost:3000 Metamask will ask you if you want to connect your account to the site.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-2-launch.png" width="800">

Ensure Hardhat #0 is selected and click 'Connect' to proceed.

You should now see the account displaying the connected state as per below.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-3-launch.png" width="300">

Next proceed to click the 'Explore' link on the homepage. This page attempts to retrieve a list of NFTs that have been created by all users that are unsold. If this is the first time running against your local hardhat blockchain the list of course will be empty.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-4-launch.png" width="800">

### 3.2 Wallet Sign in

This step will test the Architected IAM sign-in with your Metamask wallet. A message containing a server generated nonce is signed using the user's wallet and then submitted to the back end for verification. This involves Metamask generating a signature for a nonce containing message using the account private key that will be verified by a server side step performed by the Architected API.

**Signing is performed by the following web3 command**

```
window.web3.eth.personal.sign
```

To start the process click the 'Connect' button to be taken to the Metamask sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-1-metamask.png" width="800">

Then proceed to click the 'Sign in with Metamask' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-2-metamask.png" width="800">

A 'Signature Request' prompt will be shown by Metamask for the user to approve. To proceed click the 'Sign' button.

Note whilst each message signed is unique due to containing a nonce, it is important that the name in the configuration for **NEXT_PUBLIC_SITE_NAME** exactly matches the application name or signature validation will fail.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-3-metamask.png" width="800">

The first time a wallet is used for sign-in the application the user will be required to verify the sign-in by providing a verification code sent to an email address provided by the user.

As this is running in Architected dev mode all messages will be sent to the owner of the Architected account the application is running under.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-4-metamask.png" width="800">

Upon supply of the correct verification code the default landing page and menus will be displayed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-5-metamask.png" width="800">

This completes the sign-in process via Metamask.

### 3.3 NFT Creation

In the previous tutorial where we set NEXT_PUBLIC_SITE_MODE="app" the user had the ability to upload and save images and update attributes such as name and description. With NEXT_PUBLIC_SITE_MODE="dapp" the application changed the sign-in experience to be wallet based and also enables the following features once images have been uploaded.

- Ability to move files to IPFS
- Create token metadata
- Mint an NFT token

The following section will walk through the experience creating an NFT token from an uploaded image.

Starting on the 'My Files' page click the 'Upload File' button and proceed to select an image and provid a name and description.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-1-upload.png" width="800">

After the image has been uploaded you will be returned to the image list. If the image is in processing state click the refresh icon to reload.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-2-upload.png" width="800">

Now we can start the process of creating an NFT from the uploaded image. Proceed to click the image to load the details page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-3-upload.png" width="800">

Select the IPFS tab and click the 'Upload to IPFS' button.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-4-upload.png" width="800">

After a short time the image and thumbnail will be uploaded to an Infure IPFS server and the links displayed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-5-upload.png" width="800">

Proceed to select the NFT tab and confirm the name, description and price (in MATIC).

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-6-upload.png" width="800">

After clicking save all the information and assets required to create the token metadata and mint the NFT token is ready.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-7-upload.png" width="800">

To start the token creation process click the 'Mint Token' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-8-upload.png" width="800">

The minting process consumes gas like all blockchain transactions which needs to be paid for when creating the token. After clicking 'Confirm' The next prompt is for a listing fee. This is set as 0.25 MATIC in the sample and is the revenue the marketplace owner collects for when a token is created.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-9-upload.png" width="800">

Click on 'Confirm' to proceed.

After the transaction completes you will be redirected to the 'NFTs Created' page which display the NFT created on the local development blokchain for your account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-10-upload.png" width="800">

You have now have an NFT in the marketplace stored on your development blockchain.

### 3.4 NFT Purchase

To simulate purchasing one of the NFTs change the selected user in Metamask to Hardhat #1. You will also need to connect the account to the development site localhost://3000. Once connected click on the 'Explore' button to go to the marketplace page and view the NFT.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-1-purchase.png" width="800">

To start the purchase process click on the 'Buy' button which will take you to the Sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-2-purchase.png" width="800">

Click the 'Sign in with Metamask' button to proceed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-3-purchase.png" width="800">

Click the 'Sign' button to proceed with the Signature Request verification.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-4-purchase.png" width="800">

Proceed to enter the verification code sent to the admin email address to validate the initial sign in. After sign in is complete on the marketplace page proceed to click the 'Buy' button again. This will launch a Metamask Notification listing the purchase price for the market sale of the NFT.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-5-purchase.png" width="800">

Proceed to click confirm to complete the transaction.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-6-purchase.png" width="800">

Once the transaction is complete you will be able to see the NFT listed on the My Purchases page which lists NFTs that are owned by the current Metamask account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/
next-js-dapp/3-4-7-purchase.png" width="800">

That completes the NFT purchases steps for the local blockchain running on hardhat.

To summarise the activities completed, the steps followed enabled:

- Setup of a local blockchain using Hardhat
- Configuration of Metamask with Hardhat generated accounts
- Deployment of smart contracts from project to local blockchain
- Configuration of NextJS project to use local blockchain and deployed smart contracts
- Creation of an NFT from uploaded image
- Purchase of an NFT from local blockchain

In the next section we will take this sample app one step further and

- Deploy the smart contracts to Mumbai the Polygon Testnet
- Populate a Metamask account with MATIC from a Testnet faucet
- Configure the sample code to use the Architected applications uat environment
- View the transactions on Polygon Scan (Mumbai)
- Optional Deploy the next js app to Vercel

Part Two coming soon!
