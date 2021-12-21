## Introduction

This repository contains code for a sample application that incorporates the capabilities of the Architected Backend-as-a-Service API. The application, which can run in one of two ways; standard and distributed mode, is built using Next.js, and serves as a sample for learning and building applications with the API.

## Features

In the first 'standard' mode of operation, the application operates as a simple file manager. This application provides users with an email & password sign-up/sign-in
experience and the ability to upload images to a user account.

In the second 'distributed' mode of operation the application incorporates blockchain functionalities to emulate an NFT marketplace. The IAM experience is changed to
reflect the sign up/sign in experience of a Metamask wallet. Additionally, the program enables users to store images on IPFS, and to create and purchases NFTs.

If you would like to see the two different apps running based on the current repository please visit the links below:

- Standard Mode: [https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)
- Distributed Mode: [https://next-js-sample-dapp.vercel.app/](https://next-js-sample-dapp.vercel.app/)

_Note: A Metamask wallet with a connection to Polygon Mumbai Testnet is required to access the distributed mode site._

## Setup

The following guides walk through the steps required to get the application working in its respective modes.

- For instructions to install and configure the sample in 'standard' mode [click here](/app.md)
- For instructions to install and configure the sample in 'distributed' mode [click here](/dapp-localhost.md)
