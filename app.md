# Introduction (Standard Modee)

This Next.js sample application is a file management application that utilises the Architected Back-end-as-Service APIs for all back-end interactions.

The services used in this sample application include the following:

- IAM service to manage sign-up, sign-in and password reset
- File service to manage file upload, download and listing
- Content service to manage basic CMS capabilities

The Architected service is accessed in code using the npm package [architected-client](https://www.npmjs.com/package/architected-client) to ensure consistent API access across Javascript clients.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/next-js-interactions.png" width="800">

# Setup

The following guide will take you through the steps required to get the application working. The recommended IDE to be used for the demo is Visual Studio Code. If you are new to Next.js it may be worth to spend a few minutes familiarising with the basics [https://nextjs.org/docs] but this is not essential to complete the demo.

Before continuing please ensure you have created both an account and an application within the Architected management portal. If you have not done this instructions can be found here:

- [Create an Architected account](https://github.com/Architected/next-js-sample-app/wiki/2-Creating-an-account)
- [Create your first application](https://github.com/Architected/next-js-sample-app/wiki/4-Creating-an-application)

## Step 1 Clone Repo

Open a cmd prompt and run the following commands to clone the project and launch the project in vscode:

```
git clone https://github.com/Architected/next-js-sample-app.git
cd next-js-sample-app
code .
```

## Step 2 Install packages

Within Visual Studio Code open a new terminal from the Terminal menu and run the following command to install project dependancies.

```
npm install
```

## Step 3 Create settings file

In the project root create a file call **.env.local** and copy the contents of **env.template.app** into it. These settings are all the environment variables that you will need to run the application in standard mode.

The contents of env.local should look like this

```
NEXT_PUBLIC_APP_KEY="your-app-key"
NEXT_PUBLIC_API_URL="https://your-api-url/api/v1.0/"
NEXT_PUBLIC_APP_ENV="your-app-env"
NEXT_PUBLIC_SITE_MODE="app"
NEXT_PUBLIC_SITE_NAME="your-app-name"
API_KEY="your-api-key"
API_SECRET="your-api-secret"
```

_Note: Next.js uses the convention prefix NEXT_PUBLIC\_ for environment variables that are available to client code running in the browser. Therefore API_KEY and API_SECRET are only accessible to back end code running on the server._

## Step 4 Assign settings

Your Architected application in the trial plan has two client environments to operate in, Development(dev) and UAT(uat), each with its own settings, secrets and client data store. For these steps we will assume use of the **'dev'** environment.

### 4.1 Configure public settings

In the Architected management portal navigate to your application and ensure that the environment drop-down has 'Development' selected as per the screenshot below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/env-select.png" width="800">

Next ensure that the 'Details' tab is selected as below:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/details-tab.png" width="800">

From this tab make a note of the following values and update the respective settings in **.env.local** file:

- **Application Key** is required for **NEXT_PUBLIC_APP_KEY**
- **Api Url** is required for **NEXT_PUBLIC_API_URL**
- **Application Name** is required for **NEXT_PUBLIC_SITE_NAME**

The public settings in env.local should look something like this:

```
NEXT_PUBLIC_APP_KEY="your-actual-app-key"
NEXT_PUBLIC_API_URL="https://dz-api-dev-clnt-au.diztribute.com/api/v1.0/"
NEXT_PUBLIC_SITE_NAME="your-application-name"
NEXT_PUBLIC_APP_ENV="dev"
NEXT_PUBLIC_SITE_MODE="app"
```

### 4.2 Configure private settings

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

### Step 5 Launching Application

Once the settings have been saved the client application is now ready to run. Open a terminal and run the command:

```
npm run dev
```

Click the link https://localhost:3000 to launch the application in the browser.

### Step 6 Verify Functionslity

### 6.1 Home Page

Whilst no APIs are invoked from the home page you can verify that the packages are installed correctly and that the settings applied are correct:

```
NEXT_PUBLIC_SITE_NAME="your-application-name"
NEXT_PUBLIC_SITE_MODE="app"
```

You should see the following home page reflecting your settings:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-1-public-home-page.png" width="800">

### 6.2 Privacy Policy / Terms and Conditions

The sample application contains two public sample pages 'Terms and Conditions' and 'Privacy Policy' that are populated with content generated when your Architected application is created. Below is a screenshot of the Terms and Conditions page you should see when you click the hyperlink.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-2-terms.png" width="800">

The HTML is retrieved using the Content service API for a corresponding 'Page Key' and can be edited in the Architected management portal.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-2-app-pages.png" width="800">

If you want to experiment and create a new page in the management portal it can be accessed within the sample app using the respective Page Key.

### 6.3 Sign up

With the application running you can test creating a new user with an email and password using the IAM service API.

#### 6.3.1 Account Setup

On the Sign Up page enter an email and password and click the 'Sign up' button to proceed.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-1.png" width="800">

If you encounter a warning it may be the Mailbox Validation. This feature can be disabled on the Application's 'Settings' tab in the Architected management portal.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-4.png" width="800">

#### 6.3.2 Verification Step

The next page will require you to enter a verification code for the sign ip. As this is in a test environment the email will be sent to the admin users inbox to prevent unsolicited messages being sent.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-2.png" width="800">

#### 6.3.3 Complete Step

Upon successful sign up verification the process is complete.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-3.png" width="800">

#### 6.3.4 Email Customisation

Attributes within the sign-up email verification message can be configured in the Architected portal on the application's 'Settings' tab under Email Settings.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-6.png" width="800">

The corresponding sections updated are:

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-5.png" width="800">

You can also change the markup of the email template by updating the respective template from the 'Email Templates' option.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-7.png" width="800">

#### 6.3.4 Application Users

You can also see a record of the user sign-ups by selecting the 'App Users' menu option under the Application sub nav in the Architected portal.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-3-signup-8.png" width="800">

### 6.4 Sign in

Once you have successfully created and verified a user you can now attempt sign-in. On the sign in page enter your credentials and click 'Sign In'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-4-signin-1.png" width="800">

Upon successfull sign-in you will be taken to the default landing page, 'My Files'.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-4-signin-2.png" width="800">

### 6.5 Uploading a file

Now we are able to verify the ability to upload a file for the current user using the File service API. From the dashboard click the 'Upload File' button in the top rhs of the screen.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-5-upload-1.png" width="800">

Proceed to select an image and provide a name and description. After selecting an image a preview will be displayed. Click 'Save File' to continue.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-5-upload-2.png" width="800">

Once the upload is complete the dashboard will refresh and you should see a file record containing the image thumbnail and file details.

<img src="https://dzappstordevmgmtauest.blob.core.windows.net/assets/documentation/6-5-upload-3.png" width="800">

Congratulations you have verified that the sample application is working.

## 7 Next Steps

For instructions to run the app in **distributed mode** [click here](/dapp-localhost.md). This configuration uses web3 capabilities to extend functionality of the file manager with the ability to upload files to IPFS and to create non fungible tokens(NFTs).

If you would like to download and setup the **react native / expo** sample application [click here](https://github.com/Architected/react-native-sample-app). This sample application contains equivalent file management features built for mobile.

**If you encounter any problems please raise an issue.**
