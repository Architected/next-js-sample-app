## Introduction

This repo contains code for a sample application that uses the capabilities of the Architected Back-end-as-Service API. The application which can run in one of two ways, is built using NextJS and serves as a sample for both learning and building applications with the API.

API access in the application is made easy through use of the architected-client npm package. Some of the APIs consumed include the IAM, File, Content Services to deliver a fully working application once configured and running.

## Features

In the first 'basic' mode of operation the application is a simple file manager that provides an email/password sign-up/sign-in experience and the ability to upload images to a user account.

In the second 'web3' mode of operation there is a metamask wallet sign up/sign in experience with the additional features: storing images on IPFS, creating NFTs and a basic marketplace.

If you like to see the apps running based on the current repo please visit the links below:

- Standard Mode: [https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)
- dApp Mode: [https://next-js-sample-dapp.vercel.app/](https://next-js-sample-dapp.vercel.app/)

_Note: A Metamask with a connection to Polygon/Mumbai Testnet is required to access this site._

## Setup

The following guides will walk through the steps required to get the application working with Visual Studio Code.

- For instructions to install and configure the sample in 'app' mode [click here ](/app.md)
- For instructions to install and configure the sample in 'web3' mode [click here ](/dapp.md)
