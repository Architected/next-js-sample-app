import { messages } from './messages';

const getError = (data) => {
  if (data.messages) {
    console.log('data.messages[0]:' + data.messages[0]);
  }

  let message = '';
  if (data && data.errorType == 'VALIDATION') {
    message = data.messages;
  } else if (
    data &&
    (data.errorType == 'BUSINESS' || data.errorType == 'UPLOAD')
  ) {
    const businessMessage = messages.get(data.messages[0]);
    message = businessMessage ? businessMessage : data.messages[0];
  } else {
    message = messages.get('UNEXPECTED_ERROR');
  }
  console.log('message:' + message);
  return message;
};

export { getError };
