import { urlConstants } from './urlConstants';

const SignUpFlag_EMAIL = 1;
const SignUpFlag_MOBILE = 2;
const SignUpFlag_ALTERNATEEMAIL = 4;

const getNextUrlForSignUp = async (authState) => {
  var signupRequirement = authState.signupRequirement;
  var signupState = authState.signupState;

  let nextUrl = '';
  console.log('signupRequirement is: ' + signupRequirement);
  console.log('signupState is: ' + signupState);
  if (signupState == 0) {
    nextUrl = urlConstants.get('SIGNUP_EMAIL_VALIDATE');
    console.log('signupState == 0 url is: ' + nextUrl);
  } else if (signupState == 1) {
    if ((signupRequirement & SignUpFlag_MOBILE) == SignUpFlag_MOBILE) {
      nextUrl = urlConstants.get('SIGNUP_MOBILE');
    } else if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  } else if (signupState == 3) {
    if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  }

  return nextUrl;
};

const nextStep = async (tokenWrapper) => {
  const { authState, bearerToken } = tokenWrapper;
  let nextUrl = '';
  console.log('authState.signinScope:' + authState.signinScope);

  if (authState.signinScope === 'COMPLETE') {
    nextUrl = urlConstants.get('PAGE_FILE_LIST');
  } else if (authState.signinScope == 'SIGNUPINCOMPLETE') {
    nextUrl = await getNextUrlForSignUp(authState, bearerToken);
  } else if (authState.signinScope == 'CONNECTEMAIL') {
    nextUrl = urlConstants.get('SIGNUP_WALLET_CONNECT');
  }
  return nextUrl;
};

module.exports = { nextStep };
