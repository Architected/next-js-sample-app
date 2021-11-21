import axios from 'axios';

const startAuthorize = async (codeVerifier, clientDetails) => {
  const { ipAddress, userAgent } = clientDetails;

  console.log('calling connect authorize');

  var request = {
    codeVerifier: codeVerifier,
    ipAddress: ipAddress,
    userAgent: userAgent,
  };

  const response = await axios.post('/api/connect', request, {
    timeout: 30000,
  });

  return response;
};

export default startAuthorize;
