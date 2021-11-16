## Introduction

This application which can run in one of two ways, is built using NextJS and serves as a sample for building applications with the Architected Back-end-as-Service. Within the application, client API access is made easy through use of the architected-client npm package. Some of the APIs consumed include the IAM, File, Wallet and Content Services to deliver a fully working application once configured and running.

## Features

In the first 'basic' mode of operation the application is a simple file manager that allows an email/password sign up/sign in experience and the ability to upload images to an user account. In the second 'distributed' mode of operation there is a metamask wallet sign up/sign in experience with the additional features: storing images on IPFS, creating NFTs and a basic marketplace.

If you would just like to see the apps running based on the current repo please visit the links below:

- Standard Mode: [https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)
- dApp Mode: [https://next-js-sample-dapp.vercel.app/](https://next-js-sample-dapp.vercel.app/)

Note: Metamask with a connection to Polygon/Mumbai Testnet is required to access this site.

## Setup

The following guides will walk through the steps to get the application working within Visual Studio Code.

- For instructions to install and configure the sample in 'app' mode [click here ](/app.md)

- For instructions to install and configure the sample in 'dapp' mode [click here ](/dapp.md)
