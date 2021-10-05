const messages = new Map();
messages.set('DUPLICATEUSERNAME', 'User already exists');
messages.set('INVALID_CREDENTIALS', 'User already exists');
messages.set(
  'INVALID_CREDENTIALS',
  'Invalid credentials.  Please check account information and try again.'
);
messages.set('CHANGES_SAVED', 'Changes saved!');
messages.set('PASSWORD_CHANGED', 'Password changed!');
messages.set(
  'UNEXPECTED_ERROR',
  'An unexpected error has occurred please try the action again.'
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

const uploadMessages = new Map();
uploadMessages.set(
  'UPLOAD_FILE_LENGTH_IS_TOO_BIG',
  'File is too big please check and try again.'
);
const getError = (data) => {
  console.log('data:' + JSON.stringify(data));
  if (data.messages) {
    console.log('data.messages[0]:' + data.messages[0]);
  }
  let message = '';
  if (data && data.errorType == 'VALIDATION') {
    message = data.messages;
  } else if (data && data.errorType == 'BUSINESS') {
    const businessMessage = messages.get(data.messages[0]);
    message = businessMessage ? businessMessage : data.messages[0];
  } else if (data && data.errorType == 'UPLOAD') {
    const uploadMessage = uploadMessages.get(data.messages[0]);
    message = uploadMessage ? uploadMessage : data.messages[0];
  } else {
    message = 'An error has occured processing the request';
  }
  console.log('message:' + message);
  return message;
};

export { getError };
