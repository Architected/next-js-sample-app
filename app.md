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

---

The application is a simple file manager that allows an email/password sign-up/sign-in experience and the ability to upload, view and download images for a user account.

To test and instance of the app based on the current repo please visit the links below:

[https://next-js-sample-app.vercel.app/](https://next-js-sample-app.vercel.app/)

## Setup

The following guide will take you through the steps to get the application working with Visual Studio Code. If you are new to NextJS it may be worth to spend a few minutes familiarising with the basics [https://nextjs.org/docs] but that is not essential for this demo.

Before continuing please ensure you have created an account and application with the Architected Management Portal. If you have not done this instructions can be found here:

- [Create an account](https://github.com/Architected/next-js-sample-app/wiki/2-Creating-an-account)
- [Create your first application](https://github.com/Architected/next-js-sample-app/wiki/4-Creating-an-application)

### Step 1

Open a cmd prompt shell and run the following commands to clone the project into your chosen working folder and launch vscode:

```
git clone https://github.com/Architected/next-js-sample-app.git
cd next-js-sample-app
code .
```

### Step 2 Install packages

Open a new terminal from the Terminal menu

To restore dependancies run the command

```
npm install
```

### Step 3 Configure settings

In the project root create a file call env.local and copy the contents of env.template.app into it. These settings are all the environment variables that you will need to configure to run the application.

The contents of env.local should now look like this

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="app"
NEXT_PUBLIC_SITE_NAME="your site name"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

Note: NextJs uses the convention prefix NEXT_PUBLIC for environment variables that must be available to client code running in the browser. API_KEY and API_SECRET are only accessible from back end code running on the server.

### Step 4 Assign settings

Your application in the trial plan has two client environments to operate in, dev and uat, each with their own settings and secrets. For these steps we will assume use of the dev environment.

4.1 Configure public settings

Ensure that the selected environment is 'Development' as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/env-select.png" width="800">

Ensure that the Details tab is selected.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/details-tab.png" width="800">

This will allow you to configure the following keys:

- application key maps to NEXT_PUBLIC_APP_KEY
- api url maps to NEXT_PUBLIC_API_URL
- application name maps to NEXT_PUBLIC_SITE_NAME

The public settings should look something like this:

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://dz-api-dev-clnt-au.diztribute.com/api/v1.0/"
NEXT_PUBLIC_SITE_NAME="Holiday Pics"
NEXT_PUBLIC_APP_ENV="dev"
NEXT_PUBLIC_SITE_MODE="app"
```

4.2 Configure private settings

Navigate to the Application Tokens tab.

[pic]

This will allow you to configure the following keys:

- api key maps to API_KEY
- api secret maps to API_SECRET

The private settings should look something like this:

```
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

### Step 5 Launching Application

Once the settings have been saved the app is now ready to run.

Open a terminal and run the command

```
npm run dev
```

Click the link https://localhost:3000 to run the application in the browser

### Step 6 Verify Functionslity

1 Home Page

Whilst no APIs are invoked from the home page you can verify that the packages are installed correctly and that the settings:

NEXT_PUBLIC_SITE_NAME="Holiday Pics"
NEXT_PUBLIC_SITE_MODE="app"

have been applied.

You should see the following home page

2 Privacy Policy / Terms and Conditions

These are two public sample pages that retrieve markup that is generated when your application is created. The HTML is retrieved using the content API and can be edited in the architected portal.

3 Sign up

You can attempt to create a new user with an email and password using the IAM API. For non production environments all messages will be forwarded to the admin users inbox to prevent unsolicited messages being sent. However the email address entered will be subject to validation based on whether 'Mailbox Protection' is enabled.

Properties of the message sent to verify the sign-up can be configured on the Settings tab under Email Settings. Whilst the message markup can also be edited under Email Templates

You will be able to see a record of the user registration by selecting App Users under the Application in the admin website.

4 Sign in

Once you have successfully created and verified a user you can now attempt sign-in using the IAM API.

Upon successfull sign-in you should land on the default landing page

5 Uploading a file

This will verify that you are able to upload a file for the user using the file API

If you have arrived here you have verified that the sample app is working as expected.

### Next Steps

For instructions to run the app in dApp mode [click here](/dapp.md). This extends the app with web3 capabilities and allows for creation of NFTs from the uploaded images.
