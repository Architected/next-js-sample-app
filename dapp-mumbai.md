# Introduction

In the previous section we installed and configured the sample app to run against blockchain running on localhost. In this section we will deploy the smart contracts to Mumbai Testnet and utilise the higher environment setting 'uat' within the Architected service.

As the contracts will now run on a live test blockchain there are some additional things that we need to do before proceeding, namely:

- Create an Infura Account
- Add MATIC to Metamask using a Testnet Faucet

If you have not completed the first part of this guide please do so before attempting these steps [click here](/dapp-localhost.md).

# Mumbai Testnet Setup

## 1 Infura Setup

Infura is a product that provides APIs and Developer Tools that allow access to the Ethereum and IPFS networks. Infura is free to use but you will need to create an account to complete this demo. Once we have created an Infura project we will be able to deploy our smart contracts to Polygon Mumbai Testnet using Hardhat.

### 1.1 Create Infura Account

Navigate to https://infura.io/ and complete the sign up process to create a free account

### 1.2 Create Ethereum Project

Proceed to sign in to Infura and navigate to the dashboard

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/1-2-1-infura.png" width="800">

Click on the 'Create Project button and provide a name and select Ethereum for the application type.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/1-2-2-infura.png" width="800">

On the settings page change the 'Endpoints' select box to Polygon Mumbai and make a note of the project Id as we will need these in the next step.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/1-2-3-infura.png" width="800">

### 1.3 Update .env

Open the file **.env** and add an entry for the Infura Project ID as below:

```
INFURA_PROJECTID="your-project-id"
```

## 2 Polygon Mumbai Setup

In order to deploy our contracts to the Polygon Mumbai network using Infura we will need a funded account that contains some MATIC. Firstly we will need to add a new network to Metamask as it does not connect to the Mumbai network by default. Following on, in order to test buying and selling NFTs we will need additional accounts that we will fund with MATIC from a testnet faucet. This is an easy process as all you need is your account address to perform a transfer.

### 2.1 Connect Metamask to Mumbai

In this section we will add a network to Metamask to enable connect to the Polygon Mumbai Testnet.

To get started open Metamask in the browser and click the network select list.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-1-1-add-network.png" width="300">

Next Click the add network button and enter the settings below:

- Network Name: Mumbai Testnet
- RPC URL: https://rpc-mumbai.maticvigil.com
- Chain ID: 80001
- Currency Symbol: MATIC
- Block Explorer URL: https://mumbai.polygonscan.com/

Your form should look similar to the below screenshot

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-1-2-add-network.png" width="800">

After clicking save you now have a connection to the Polygon Mumbai Testnet

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-1-3-add-network.png" width="800">

### 2.2 Create New Wallet Accounts

We will create the following three new accounts in Metamask.

- Mumbai Contract Owner
- Mumbai Seller
- Mumbai Buyer

Whilst not strictly required, as Metamask accounts can have balances on different networks. It is a good practice to keep accounts seperate and distinct across environments especially for testing purposes. Safety of accounts private keys on live networks is imperative and should never be disclosed or shared.

Click the 'My Accounts' icon and click Create Account

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-2-1-create-account.png" width="800">

Enter the 'Account Name' and click create.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-2-2-create-account.png" width="800">

You should now see the created account with a zero MATIC balance.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-2-3-create-account.png" width="800">

Make a note of the public address for the account and repeat the process for accounts 'Mumbai Seller' and 'Mumbai Buyer'

### 2.3 Fund New Wallet Accounts

In the testnet blockchain unfortunately not live it is possible to fund wallet accounts using a faucet.For Polgon Mumbai you will need to go to the following URL.

https://faucet.polygon.technology/

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-3-1-faucet.png" width="800">

For each of the mumbai accounts created in 2.2 enter the Wallet Address and click the Submit button.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-3-2-faucet.png" width="800">

Click confirm to submit the Token request

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-3-3-faucet.png" width="800">

Once processed the Metamask should update with the funds within a minute.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/2-3-4-faucet.png" width="800">

If you need additional tokens simply resubmit your account address at the faucet. Note you may need to wait a few minutes in between submissions depending on how busy the faucet is at any moment in time.

## 3 Configure UAT

Applications created with the Architected Service have 3 logical environments so that you can develop following a software development lifecycle. Development(dev), UAT(uat) and Production(prod). This keeps data, settings and security separate for each instance of your client front end application as you development and promote your code.
In this section we will update the application configuration to reflect the UAT settings. (Note Production is not available in this alpha environment).

### 3.1 Configure application settings

The contents of the following keys in **.env.local** will be updated to reflect the new environment.

Ensure you are logged in to the Architected Portal at the url

https://alpha.architected.net

Proceed to navigate to your application details page aand ensure that the selected environment is 'UAT' as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-1-1-uat.png" width="800">

Navigate to the Application Tokens tab.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-1-2-uat.png" width="800">

This will allow you to update the following keys:

- api key maps to API_KEY
- api secret maps to API_SECRET

Proceed to update the following settings in **.env.local** similar to this:

```
NEXT_PUBLIC_APP_ENV="uat"
API_KEY="your-uat-api-key"
API_SECRET="your-uat-api-secret"
```

### 3.2 Configure chain settings

Next we will update the chain settings in **.env.local** as we will be using Mumbai instead of localhost when we run the application. These settings are used to check that we are connected to the correct chain.

Update the following fields listed below

```
NEXT_PUBLIC_CHAIN_ID="0x13881"
NEXT_PUBLIC_CHAIN_NAME="Mumbai Testnet"
```

### 3.3 Configure contract owner

For this step we need to open metamask and select the Mumbai Contract Owner account. Proceed to click account details from the option list.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-3-1-contract.png" width="800">

Next Click Export Private Key

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-3-2-contract.png" width="800">

Enter your password

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-3-3-contract.png" width="800">

Make a note of your private key

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/3-3-4-contract.png" width="800">

Proceed to update the entry in **.env** as below with the copied value.

```
CONTRACT_OWNER_PRIVATE_KEY="your-account-private-key"
```

Note **.env** is included in the .gitignore file so will not be committed but make sure to ignore this file in the source control tool of your choice.

## 4 Deploy Contracts

### 4.1 Update hardhat configuration

To allow hardhat to connect to mumbai open the file **hardhat.config.js** and remove the comments. The file should now look like this.

```
require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

const projectId = process.env.INFURA_PROJECTID;
const accountPrivateKey = process.env.CONTRACT_OWNER_PRIVATE_KEY;

module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: 'https://polygon-mumbai.infura.io/v3/' + projectId,
      accounts: [accountPrivateKey],
    }
  },
  solidity: '0.8.4',
};

```

The url to discover the Polygon Mumbai network is the same pattern as that provided in the Infura project created earlier and the account that will own and fund contract transactions will be the Mumbai Contract Owner that we configued in 3.3

## 4.2 Deploy contracts

The file ./scripts/deploy.js is used by Hardhat to compile and deploy the two contracts in the project.

To deploy to the Mumbai Testnet we need to change the network switch to mumbai as per the command below:

```
npx hardhat run scripts/deploy.js --network mumbai
```

Run the command and you should see output similar to the screenshot below.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/4-2-1-mumbai.png" width="800">

Make a note of the two contract addresses created.

In your **.env.local** file update the values for the following properties:

```
NEXT_PUBLIC_NFT_ADDRESS="[value for NFT]"
NEXT_PUBLIC_MARKET_ADDRESS="[value for NFTMarket]"
```

Congratulations you hvae now deployed a contract to Polygon Mumbai Testnet.

It is also possible to view these contracts on polygonscan at the following url

https://mumbai.polygonscan.com/

To view the marketplace contract paste your 'NEXT_PUBLIC_MARKET_ADDRESS' value and click search

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/4-2-2-mumbai.png" width="800">

To view the NFT contract paste your 'NEXT_PUBLIC_MARKET_ADDRESS' value and click search

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/4-2-3-mumbai.png" width="800">

If you click the contract creator link so can see the two creation events listed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/4-2-4-mumbai.png" width="800">

Also if you click the Internal Txns tab you can see the faucet transactions that were triggered when allocating tokens.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/4-2-5-mumbai.png" width="800">

Later after testing NFT creation and purchase you will be able to see further transactions that are created on the blockchain.

## 5 Testing

Now that the smart contracts have been deployed to mumbai testnet and the project configuration has been updated we are ready to test the application functionality

### 5.1 Launch Application

Back in Visual Code open a terminal window and run the command below to start the project

```
npm run dev
```

Make sure the Mumbai network is selected in the network list and proceed to connect with the Mumbai Seller account. If the site is unconnected proceed to connect with the Metamask account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-1-1-test.png" width="800">

Once connected you should now see the account displaying the connected state as per below.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-1-2-test.png" width="800">

Next proceed to click the 'Explore' link on the homepage. This page attempts to retrieve a list of NFTs that have been created by all users that are unsold. If this is the first time running against your contracts on the Mumbai Testnet the list will be empty.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-1-3-test.png" width="800">

### 5.2 Wallet Sign in

This step will test the IAM sign-in with your Metamask wallet against Mumbai Testnet and your Architected application running in UAT mode.

To start the process click the 'Connect' button to be taken to the Metamask sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-2-1-test.png" width="800">

Then proceed to click the 'Sign in with Metamask' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-2-2-test.png" width="800">

A 'Signature Request' prompt will be shown by Metamask for the user to approve. To proceed click the 'Sign' button.

The first time a wallet is used for sign-in the application user will be required to verify the sign-in by providing a verification code sent to an email address provided by the user. Upon supply of the correct verification code the default landing page and menus will be displayed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-2-3-test.png" width="800">

This completes the sign-in process via Metamask.

### 5.3 NFT Creation

The following section will walk through the experience creating an NFT token from an uploaded image. Starting on the 'My Files' page click the 'Upload File' button.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-2-4-test.png" width="800">

Proceed to select an image and provide a name and description.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-1-test.png" width="800">

After the image has been uploaded you will be returned to the image list. If the image is in processing state click the refresh icon to reload.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-2-test.png" width="800">

Now we can start the process of creating an NFT from the uploaded image. Proceed to click the image to load the details page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-3-test.png" width="800">

Select the IPFS tab

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-4-test.png" width="800">

Click the 'Upload to IPFS' button. After a short time the image and thumbnail will be uploaded to an Infura IPFS server and the links displayed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-5-test.png" width="800">

Proceed to select the NFT tab and confirm the name, description and price (in MATIC).

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-6-test.png" width="800">

After clicking save all the information and assets required to create the token metadata and mint the NFT token is ready.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-7-test.png" width="800">

To start the NFT token creation process click the 'Mint Token' button

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-8-test.png" width="800">

The minting process consumes gas which needs to be paid as part of the token creation. The estimated gas feed is displayed in the prompt. Click 'Confirm' to proceed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-9-test.png" width="800">

The next prompt is a listing fee that is paid to the marketplace contract owner. This is set as 0.25 MATIC in the contract. Click on 'Confirm' to proceed. After the transaction completes you will be redirected to the 'NFTs Created' page which display the NFT created on the local development blokchain for your account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-10-test.png" width="800">

You have now have an NFT in the marketplace stored on your Polygon Mumbai. In a new window navigate to Mumbai Polygan Scan, https://mumbai.polygonscan.com/ and search for the public address of 'Mumbai Seller'.

In the transactions tab you will see 2 transactions for the create token and marketplace payment actions

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-11-test.png" width="800">

In the ERC721 Token txns tab you will see the token creation followed by its assignment to the marketplace contract owner ready for sale.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-3-12-test.png" width="800">

### 5.4 NFT Purchase

To simulate purchasing one of the NFTs logout and change the selected user in Metamask to Mumbai Buyer. Once again you will also need to connect the account to the development site localhost://3000.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-1-test.png" width="800">

Once connected you will see the green connected icon.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-2-test.png" width="800">

With your now connected Metamask account click on the 'Explore' button to go to the marketplace page and view the NFT. Depending on the NFT Token price you may want to head back to the faucet to acquire some more tokens.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-3-test.png" width="800">

To start the purchase process click on the 'Buy' button which will take you to the Sign in page.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-4-test.png" width="800">

Click the 'Sign in with Metamask' button to proceed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-5-test.png" width="800">

Click the 'Sign' button to proceed with the Signature Request verification.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-6-test.png" width="800">

Proceed to enter the verification code sent to the admin email address to validate the initial sign in.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-7-test.png" width="800">

After sign in is complete you will be taken to the 'My Files' page. As we only want to purchase proceed to click on the 'Marketplace' link.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-8-test.png" width="800">

On the marketplace page click the 'Buy' button. This will launch a Metamask Notification listing the purchase price for the market sale of the NFT. In the example below the cost is 1 MATIC plus gas fees.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-9-test.png" width="800">

Proceed to click Confirm to complete the NFT purchase. Once the transaction is complete you will be able to see the NFT listed on the My Purchases page which lists all NFTs that are owned by the current Metamask account.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-10-test.png" width="800">

Searching again on Mumbai PolygonScan for the Mumbai Buyer

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-dapp/mumbai/5-4-11-test.png" width="800">

That completes the NFT purchases steps for the blockchain running on Polygon Mumbai.

To summarise the activities completed, the steps followed enabled:

- Deployed the smart contracts to Mumbai the Polygon Testnet
- Populated a Metamask account with MATIC from a Testnet faucet
- Configured the sample code to use the Architected applications uat environment
- Viewed the transactions on Polygon Scan (Mumbai)

To view this site running on Vercel navigate to the link below:
