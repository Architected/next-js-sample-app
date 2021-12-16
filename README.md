## Introduction

This repo contains code for a sample application that uses the capabilities of the Architected Back-end-as-Service API. The application which can run in one of two ways, is built using Next.js and serves as a sample for both learning and building applications with the API.

## Features

In the first 'standard' mode of operation the application is a simple file manager that provides an email/password sign-up/sign-in experience and the ability to upload images to a user account.

In the second 'distributed' mode of operation the application adds features to become an NFT marketplace. The IAM experience is replaced with a Metamask wallet sign up/sign in experience alongside additional features such as storing images on IPFS and NFT creation and purchase.

If you would like to see the apps running based on the current repo please visit the links below:

- Standard Mode: [https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)
- Distributed Mode: [https://next-js-sample-dapp.vercel.app/](https://next-js-sample-dapp.vercel.app/)

_Note: Metamask with a connection to Polygon Mumbai Testnet is required to access this site._

## Setup

The following guides will walk through the steps required to get the application working in the different modes.

- For instructions to install and configure the sample in 'standard' mode [click here](/app.md)
- For instructions to install and configure the sample in 'distributed' mode [click here](/dapp-localhost.md)
