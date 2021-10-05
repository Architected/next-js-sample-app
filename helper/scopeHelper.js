const { PAGE_FILE_LIST } = require('./routeHelper');

const urlConstants = new Map();

urlConstants.set('SIGNUP_EMAIL_VALIDATE', '/signup/email/validate');
urlConstants.set(
  'SIGNUP_ALTERNATEEMAIL_VALIDATE',
  '/signup/alternateemail/validate'
);
urlConstants.set('SIGNUP_MOBILE_VALIDATE', '/signup/mobile/validate');
urlConstants.set('SIGNUP_MOBILE', '/signup/mobile');
urlConstants.set('SIGNUP_ALTERNATEEMAIL', '/signup/alternateemail');
urlConstants.set('SIGNUP_COMPLETE', '/signup/complete');
urlConstants.set('SIGNIN', '/signin');
urlConstants.set('SIGNIN_VERIFY_AUTHY', '/signin/verify-authy');
urlConstants.set(
  'SIGNIN_VERIFY_ALTERNATEEMAIL',
  '/signin/verify-alternate-email'
);
urlConstants.set('SIGNIN_VERIFY_MOBILE', '/signin/verify-mobile');
urlConstants.set('SIGNIN_VERIFY_SELECT', '/signin/verify-select');
urlConstants.set('SIGNIN_VERIFY_HELP', '/signin/verify-help');
urlConstants.set('PASSWORD_RESET_START', '/password-reset/start');
urlConstants.set('PASSWORD_RESET_COMPLETE', '/password-reset/complete');
urlConstants.set('PASSWORD_RESET_VALIDATE', '/password-reset/validate');
urlConstants.set('PASSWORD_RESET_CHANGE', '/password-reset/change');

//const SignUpFlag_EMAIL = 1;
const SignUpFlag_MOBILE = 2;
const SignUpFlag_ALTERNATEEMAIL = 4;

const getNextUrlForSignUp = async (authState) => {
  var signupRequirement = authState.signupRequirement;
  var signupState = authState.signupState;

  let nextUrl = '';
  console.log('signupRequirement is: ' + signupRequirement);
  console.log('signupState is: ' + signupState);
  if (signupState == 0) {
    //await SignUpService.emailVerify({ isResend: true }, bearerToken.tokenValue);
    nextUrl = urlConstants.get('SIGNUP_EMAIL_VALIDATE');
    console.log('signupState == 0 url is: ' + nextUrl);
  } else if (signupState == 1) {
    if ((signupRequirement & SignUpFlag_MOBILE) == SignUpFlag_MOBILE) {
      //await ClientAPI.SignUpMobileVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_MOBILE');
    } else if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      //await ClientAPI.SignUpAlternateEmailVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  } else if (signupState == 3) {
    if (
      (signupRequirement & SignUpFlag_ALTERNATEEMAIL) ==
      SignUpFlag_ALTERNATEEMAIL
    ) {
      //await ClientAPI.SignUpAlternateEmailVerify(new VerifyRequestM());
      nextUrl = urlConstants.get('SIGNUP_ALTERNATEEMAIL');
    }
  }

  return nextUrl;
};

const nextStep = async (tokenWrapper) => {
  const { authState, bearerToken } = tokenWrapper;
  let nextUrl = '';
  console.log('authState' + JSON.stringify(authState));
  console.log('authState.signinScope' + authState.signinScope);

  //Add additional logic from signinbase later
  if (authState.signinScope === 'COMPLETE') {
    nextUrl = PAGE_FILE_LIST;
  } else if (authState.signinScope == 'SIGNUPINCOMPLETE') {
    nextUrl = await getNextUrlForSignUp(authState, bearerToken);
  } else if (authState.signinScope == 'CONNECTEMAIL') {
    nextUrl = '/signup/wallet/connect';
  }
  return nextUrl;
};

module.exports = { nextStep };
