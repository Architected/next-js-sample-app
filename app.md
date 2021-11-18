## Introduction

This NextJS sample application is a file management application that utilises the Architected Back-end-as-Service APIs for all back-end interactions.

The services used in this fully functional sample application include the following:

- IAM to manage sign-up, sign-in and password reset
- File to manage file upload, download and listing
- Content to manage CMS capabilities

The architected API is accessed via the npm package (architected-client) that ensures consistent client API access across Javascript clients.
_Note this package is also used in the React Native and dApp sample apps_

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-interactions.png" width="800">

## Features

The application is a simple file manager that allows an email/password sign-up/sign-in experience and the ability to upload, view and download images for a user account.

To test and instance of the app based on the current repo please visit the links below:

[https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)

## Setup

The following guide will take you through the steps to get the application working with Visual Studio Code. If you are new to NextJS it may be worth to spend a few minutes familiarising with the basics [https://nextjs.org/docs] but that is not essential for this demo.

Before continuing please ensure you have created an account and application with the Architected Management Portal. If you have not done this instructions can be found here:

- [Account Creation](/wiki/2-Creating-an-account)
- [Application Creation](/wiki/4-Creating-an-application)

### Step 1

Open a cmd prompt shell and run the following commands to clone the project into your chosen working folder and launch vscode:

```
1 git clone https://github.com/Architected/next-js-sample-app.git
2 cd next-js-sample-app
3 code .
```

### Step 2 Install packages

Open a new terminal from the Terminal menu

To restore dependancies run the command

```
npm install
```

### Step 3 Configure settings

Create a file call env.local and copy the contents of env.template.app into it. These are all the environment variables that you will need to configure to run the application which we will configure shortly

The contents of env.local should now look like this

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="app"
NEXT_PUBLIC_SITE_NAME="your site name"
```

Note: NextJs uses the convention prefix NEXT*PUBLIC*' for environment variables that are available to client code running in the browser. API_KEY and API_SECRET are only accessible from back channel api calls running within the server layer.

### Step 4 Assign settings

Firstly make sure you are signed in to the architected portal.

Your application API in the alpha environment running user the trial plan provides two logical client environments for your application to run under, dev and uat, each with their own api keys and secrets. This allows you to make changes to email templates, content and maintain different user stores during your application development. Once the paid plans are ready their will also be the production client environment which you would use once going live with your application.

4.1 Navigate to the Application Details tab.

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
NEXT_PUBLIC_SITE_NAME="your site name"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="app"
```

4.2 Navigate to the Application Tokens tab.

```
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

### Step 5 Launching Application

Open a terminal and run the command npm run dev

Click the link https://localhost:3000 to run the application in the browser

For instructions to run the app in dApp mode [click here ](/dapp.md)
