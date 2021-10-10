import axios from 'axios';

const startAuthorize = async (codeVerifier, clientDetails) => {
  const { ipAddress, userAgent } = clientDetails;

  // call authorize
  console.log('calling connect authorize');

  var request = {
    codeVerifier: codeVerifier,
    ipAddress: ipAddress,
    userAgent: userAgent,
  };

  const response = await axios.post('/api/connect', request, {
    timeout: 30000,
  });

  //console.log('startAuthorize:response:' + JSON.stringify(response));

  return response;
  // if (response && response.status >= 200 && response.status <= 299) {
  //   return response.data;
  // }
};

export default startAuthorize;
