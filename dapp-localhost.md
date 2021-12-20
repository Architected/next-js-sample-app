# Introduction (distributed mode / localhost)

This demo project will utilise blockchain technologies and smart contracts to enhance the capabilities of the file manager was used in the previous guide. This localhost version of the guide comes with two ready made solidity contracts to make getting started easier. If you have never worked with a smart contract before don't worry as this guide will walk you the compilation and deployment process.

To manage development on localhost, Hardhat and Infura are used. Hardhat is an Ethereum development environment that makes it easy to compile and run your contracts on a development network, whilst Infura will provide an IPFS service to host metadata and images required for the NFTs that will be created.

No actual tokens will be needed for this guide as the Hardhat development environment provides funded wallet addresses.

Finally to use this distributed application you will need to install the crypto wallet, Metamask, in your browser. This will be used not only for performing transactions but for sign-in authentication. If you have not installed Metamask, please proceed to install for Chrome if you would like to continue with this demo:

https://metamask.io/download

This tutorial is in two parts.

Part one will use a blockchain on localhost and will cover the following steps:

- Sample project setup with your Architected application's 'dev' environment
- Deployment of smart contracts to the local blockchain
- Application testing and NFT creation

Part two will use Polygon and Mumbai Testnet and will cover the following steps:

- Sample project setup with your Architected application's 'uat' environment
- Deployment of smart contracts to the Mumbai Testnet blockchain
- Application testing and NFT creation

Before continuing please ensure you have created both an account and an application within the Architected management portal. If you have not done this instructions can be found here:

- [Create an Architected account](https://github.com/Architected/next-js-sample-app/wiki/2-Creating-an-account)
- [Create your first application](https://github.com/Architected/next-js-sample-app/wiki/4-Creating-an-application)

# Part 1 - Local Blockchain Setup

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

### 1.3 Create settings file

In the project root create a file call **.env.local** and copy the contents of **.env.template.dapp** into it. These settings are all the environment variables that you will need to run the application.

The contents of **.env.local** should look similar to this:

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="dapp"
NEXT_PUBLIC_SITE_NAME="your-app-name"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
NEXT_PUBLIC_CHAIN_ID="0x539"
NEXT_PUBLIC_CHAIN_NAME="Hardhat"
NEXT_PUBLIC_NFT_ADDRESS="your-nft-contract-address"
NEXT_PUBLIC_MARKET_ADDRESS="your-market-contract-address"
```

### 1.4 Configure public settings

In the Architected management portal navigate to your application and ensure that the environment drop-down has 'Development' selected as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/env-select.png" width="800">

Next ensure that the 'Details' tab is selected as below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/details-tab.png" width="800">

From this tab make a note of the following values and update the respective settings in **.env.local** file:

- **Application Key** is required for **NEXT_PUBLIC_APP_KEY**
- **Api Url** is required for **NEXT_PUBLIC_API_URL**
- **Application Name** is required for **NEXT_PUBLIC_SITE_NAME**

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
NEXT_PUBLIC_NFT_ADDRESS="your-nft-contract-address"
NEXT_PUBLIC_MARKET_ADDRESS="your-market-contract-address"
```

Don't worry about the last two settings for now as we will determine the contract addresses later in section 2.3.

### 1.5 Configure private settings

To configure the application secrets click on the 'Access Tokens' tab.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/token-tab.png" width="800">

From this tab make a note of the following values:

- **Api Key** is required for **API_KEY**
- **Api Secret** is required for **API_SECRET**

The private settings in **.env.local** should look something like this:

```
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

## 2 Blockchain Setup

## 2.1 Start hardhat environment

We need to start the local blockchain environment provided by Hardhat. In a new terminal window run the following command.

```
npx hardhat node
```

This will start your local blockchain and provide you with 20 accounts each containing 10000 ETH for you to use.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-1-hardhat-node.png" width="800">

Be aware of the message

```
WARNING: These accounts, and their private keys, are publicly known.
Any funds sent to them on Mainnet or any other live network WILL BE LOST.
```

These blockchain accounts addresses are static and publicly known so only use these for testing purposes.

## 2.2 Add test account to metamask

From the previous step we will use the first two accounts and add them to Metamask. With Metamask open click the 'My Accounts' icon in the top RHS and then proceed to select 'Import Account'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-1-import-account.png" width="250">

For Account #0 listed in output of section 2.1, paste the Private Key and click 'Import'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-2-import-account.png" width="250">

To rename the account click the 'Account Options' icon and select 'Account Details'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-3-import-account.png" width="250">

Proceed to rename the account to Hardhat #0 and save.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/2-2-4-import-account.png" width="300">

Repeat the process for Account #1 from the list in section 2.1.

This will give us to two test accounts in Metamask that will allow us to simulate having a different account for a buyer and seller.

## 2.3 Deploying contracts

The file ./scripts/deploy.js is used by Hardhat to compile the two contracts in the project and deploy them to the local blockchain.

With your local blockchain running from step 2.1. Open a new terminal window and run the following command to deploy the contracts.

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

This completes the blockchain setup on your local machine. Make sure to have the terminal window open from step 2.1 for the remainder of the guide. If you need to restart your Hardhat environment at any time just rerun the command

```
npx hardhat node
```

## 3 Testing

Now that the smart contracts have been deployed to a local running blockchain we are ready to test the application functionality

### 3.1 Launch Application

In a separate terminal window run the command below to start the Next.js project:

```
npm run dev
```

The homepage displayed is different to the 'app' version in the previous tutorial and should look like this:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-1-launch.png" width="800">

If you see the previous homepage double check that the following setting has been applied in **.env.local**:

```
NEXT_PUBLIC_SITE_MODE="dapp"
```

Next click on the Metamask icon and make sure the localhost network is selected in the drop down list. The first time you launch the application on localhost:3000, Metamask will ask you if you want to connect your account to the site.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-2-launch.png" width="800">

Ensure Hardhat #0 is selected and click 'Connect' to proceed.

You should now see the account displaying the connected state as per below.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-3-launch.png" width="250">

Next proceed to click the 'Explore' link on the homepage. This page attempts to retrieve a list of NFTs created by all users that are currently unsold. If this is the first time running against your local hardhat blockchain the list of course will be empty.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-1-4-launch.png" width="800">

### 3.2 Wallet Sign in

This step will test the Architected IAM sign-in using your Metamask wallet. A message containing a server generated nonce is signed using the user's wallet and then submitted to the back end for verification. This involves Metamask generating a signature for a nonce containing message using the account private key that will be verified by a server side step performed by the Architected API.

**Signing is performed by the following web3 command**

```
window.web3.eth.personal.sign
```

To start the process click the 'Connect' button to be taken to the Metamask sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-1-metamask.png" width="800">

Then proceed to click the 'Sign in with Metamask' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-2-metamask.png" width="800">

A 'Signature Request' prompt will be shown by Metamask for the user to approve. To proceed click the 'Sign' button.

_Note: Whilst each message signed is unique due to containing a nonce, it is important that the name in the configuration for **NEXT_PUBLIC_SITE_NAME** exactly matches the application name or signature validation will fail._

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-3-metamask.png" width="800">

The first time a wallet is used for sign-in the application the user will be required to verify the sign-in by providing a verification code sent to an email address provided by the user.

As this sample application is running in Architected 'dev' mode, all messages will be sent to the owner of the Architected account the application is running under.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-4-metamask.png" width="800">

Upon supply of the correct verification code the default landing page and menus will be displayed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-2-5-metamask.png" width="800">

This completes the sign-in process via Metamask. You have successfully used your Metamask wallet account to sign in to the Architected Backend as a Service API using your sample application.

### 3.3 NFT Creation

In the previous tutorial where we set NEXT_PUBLIC_SITE_MODE="app", the user had the ability to upload and save images and update attributes, such as name and description. With NEXT_PUBLIC_SITE_MODE="dapp" the application changed the sign-in experience to be wallet based and also enables the following features once images have been uploaded.

- Ability to copy files to IPFS
- Ability to create token metadata
- Ability to mint and pourchase NFTs

The following section will walk through the experience of creating an NFT from an uploaded image.

Starting on the 'My Files' page click the 'Upload File' button and proceed to select an image and provide a name and description.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-1-upload.png" width="800">

After the image has been uploaded you will be returned to the file list view. If the image is in processing state click the refresh icon to reload. This should take no longer than 10-15 seconds.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-2-upload.png" width="800">

Now we can start the process of creating an NFT from the uploaded image. Proceed to click the image to load the details page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-3-upload.png" width="800">

Select the IPFS tab and click the 'Upload to IPFS' button.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-4-upload.png" width="800">

After a short time the image and thumbnail will be uploaded to an Infura IPFS server and links will be displayed for the main image and a thumbnail upon completion.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-5-upload.png" width="800">

Proceed to select the NFT tab and confirm the name, description and token price (in MATIC).

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-6-upload.png" width="800">

After clicking the save button all the information and assets required to create the token metadata and mint the NFT is ready.

_Note: NFTs implement the ERC721 standard and store their metadata and related assets on IPFS storage with only the path to the metadata file being stored within the token on the blockchain._

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-7-upload.png" width="800">

To start the token creation process click the 'Mint Token' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-8-upload.png" width="800">

This minting process consumes gas like all blockchain transactions which needs to be paid for when creating the token. After clicking 'Confirm', the next prompt is for a listing fee. This is set as 0.25 MATIC in the sample and is the revenue the marketplace owner collects for when a token is minted.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-9-upload.png" width="800">

To pay the minting fee click on 'Confirm' to proceed.

After the transaction completes you will be redirected to the 'NFTs Created' page which displays the NFT created on the local development blokchain for your wallet account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-3-10-upload.png" width="800">

You have now have an NFT in the marketplace stored on your development blockchain.

### 3.4 NFT Purchase

To simulate purchasing one of the NFTs change the selected user in Metamask to Hardhat #1. You will again need to connect the account to the development site localhost://3000. Once connected click on the 'Explore' button to go to the marketplace page and view the NFT.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-1-purchase.png" width="800">

To start the purchase process click on the 'Buy' button which will take you to the Sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-2-purchase.png" width="800">

Click the 'Sign in with Metamask' button to proceed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-3-purchase.png" width="800">

Click the 'Sign' button to proceed with the **Signature Request** verification.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-4-purchase.png" width="800">

Proceed to enter the verification code sent to the admin email address to validate the initial sign in. After sign in is complete on the marketplace page proceed to click the 'Buy' button again. This will launch a Metamask Notification listing the purchase price for the market sale of the NFT.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-5-purchase.png" width="800">

Proceed to click confirm to complete the transaction.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/3-4-6-purchase.png" width="800">

Once the transaction is complete you will see the NFT listed on the 'My Purchases' page, which lists NFTs that are owned by the current Metamask account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/
next-js-dapp/3-4-7-purchase.png" width="800">

This completes the NFT purchase steps using your local blockchain running on hardhat.

To summarise the activities completed, the steps followed enabled:

- Setup of a local blockchain using Hardhat
- Configuration of Metamask with Hardhat generated accounts
- Deployment of smart contracts from project to local blockchain
- Configuration of NextJS project to use local blockchain and deployed smart contracts
- Creation of an NFT from an uploaded image
- Purchase of an NFT from a local blockchain

In the next section we will take this sample app one step further and

- Deploy the smart contracts to Mumbai the Polygon Testnet
- Populate a Metamask account with MATIC from a Testnet faucet
- Configure the sample code to use the Architected applications uat environment
- View the transactions on Polygon Scan (Mumbai)
- Optional Deploy the next js app to Vercel

For instructions to run the sample against Polygon Mumbai testnet [click here](/dapp-mumbai.md).
