const messages = new Map();
messages.set(
  'INVALID_CREDENTIALS',
  'Invalid credentials.  Please check account information and try again.'
);
messages.set('CHANGES_SAVED', 'Changes saved!');
messages.set('PASSWORD_CHANGED', 'Password changed!');
messages.set(
  'UNEXPECTED_ERROR',
  'An unexpected error has occured processing the request.'
);
messages.set(
  'DUPLICATEUSERNAME',
  'This user is already registered. Please sign in to continue.'
);
messages.set('VALIDATE_FAILED', 'Invalid code please check and try again.');
messages.set('INVALID_EMAIL', 'Please enter a valid email address');
messages.set(
  'CONNECTSERVICE_INVALID_CONFIGURATION',
  'Unable to connect to service. Please contact your site adminisitrator [CS001].'
);
messages.set(
  'CONNECTSERVICE_INVALID_APPKEY',
  'Unable to connect to service. Please contact your site adminisitrator [CS002].'
);
messages.set(
  'CONNECTSERVICE_INVALID_API_CREDENTIALS',
  'Unable to connect to service. Please contact your site adminisitrator [CS003].'
);
messages.set(
  'CONNECTSERVICE_INVALID_RESPONSE',
  'Unable to connect to service. Please contact your site adminisitrator [CS004].'
);
messages.set(
  'INVALID_CONNECT_CREDENTIALS',
  'Invalid connect credentials for service. Please contact your site adminisitrator.'
);
messages.set(
  'INVALID_CONNECT_CHANNEL_TYPE',
  'Invalid connect channel type for service. Please contact your site adminisitrator.'
);
messages.set(
  'INVALID_CONNECT_APP_ID',
  'Invalid connect app id for service. Please contact your site adminisitrator.'
);
messages.set(
  'INVALID_CONNECT_CONFIGURATION',
  'Invalid connect configuration for service. Please contact your site adminisitrator.'
);
messages.set(
  'INVALID_CONNECT_REFERRER',
  'Invalid connect referrer for service. Please contact your site adminisitrator.'
);
messages.set(
  'INVALID_CLIENT_TYPE_FOR_FRONT_CHANNEL',
  'Invalid connect client type for front channel service. Please contact your site adminisitrator.'
);
messages.set(
  'AUTHORIZATION_FAILED',
  'Request authorization failed please try again.'
);
messages.set(
  'AUTHORIZATION_MATCH_FAILED',
  'Request authorization matching failed please try again.'
);
messages.set('VALIDATE_FAILED', 'Invalid code please check and try again.');
messages.set(
  'UPLOAD_FILE_LENGTH_IS_TOO_BIG',
  'File is too big please try again.'
);
messages.set(
  'EMAIL_VALIDATION_FAILED',
  'Invalid email address please try again.'
);

export { messages };
