const urlConstants = new Map();

urlConstants.set('SIGNUP_EMAIL_VALIDATE', '/auth/signup/email/validate');
urlConstants.set(
  'SIGNUP_ALTERNATEEMAIL_VALIDATE',
  '/auth/signup/alternateemail/validate'
);
urlConstants.set('SIGNUP_MOBILE_VALIDATE', '/auth/signup/mobile/validate');
urlConstants.set('SIGNUP_MOBILE', '/auth/signup/mobile');
urlConstants.set('SIGNUP_ALTERNATEEMAIL', '/auth/signup/alternateemail');
urlConstants.set('SIGNUP_COMPLETE', '/auth/signup/complete');
urlConstants.set('SIGNUP_WALLET_CONNECT', '/auth/signup/wallet/connect');
urlConstants.set('SIGNUP_WALLET_VALIDATE', '/auth/signup/wallet/validate');

urlConstants.set('SIGNIN', '/signin');
urlConstants.set('SIGNIN_VERIFY_AUTHY', '/auth/signin/verify-authy');
urlConstants.set(
  'SIGNIN_VERIFY_ALTERNATEEMAIL',
  '/auth/signin/verify-alternate-email'
);
urlConstants.set('SIGNIN_VERIFY_MOBILE', '/auth/signin/verify-mobile');
urlConstants.set('SIGNIN_VERIFY_SELECT', '/auth/signin/verify-select');
urlConstants.set('SIGNIN_VERIFY_HELP', '/auth/signin/verify-help');
urlConstants.set('SIGNOUT', '/auth/signout');
urlConstants.set('PASSWORD_RESET_START', '/auth/password-reset/start');
urlConstants.set('PASSWORD_RESET_VALIDATE', '/auth/password-reset/validate');
urlConstants.set('PASSWORD_RESET_PERFORM', '/auth/password-reset/perform');
urlConstants.set('PASSWORD_RESET_COMPLETE', '/auth/password-reset/complete');
urlConstants.set('PAGE_FILE_LIST', '/file');
urlConstants.set('PAGE_MARKETPLACE', '/marketplace');

export { urlConstants };
