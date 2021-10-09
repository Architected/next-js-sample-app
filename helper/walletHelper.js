import axios from 'axios';
import { architectedConfig } from '../architectedConfig';

const getWallet = async (wallet, authorizationCode, codeVerifier) => {
  // call authorize
  console.log('calling getWallet');

  var walletRequest = {
    accountAddress: wallet.accountAddress,
    chainId: wallet.chainId,
    authorizationCode: authorizationCode,
    codeVerifier: codeVerifier,
  };

  console.log('getWallet:request:' + JSON.stringify(walletRequest));
  const response = await axios.post('/api/wallet/get', walletRequest, {
    timeout: architectedConfig.timeout,
  });

  console.log('getWallet:response:' + JSON.stringify(response));

  return response;
};

const createWallet = async (wallet, authorizationCode, codeVerifier) => {
  // call authorize
  console.log('calling createWallet');

  var walletRequest = {
    accountAddress: wallet.accountAddress,
    chainId: wallet.chainId,
    authorizationCode: authorizationCode,
    codeVerifier: codeVerifier,
  };

  const response = await axios.post('/api/wallet/create', walletRequest, {
    timeout: architectedConfig.timeout,
  });

  console.log('createWallet:response:' + JSON.stringify(response));

  return response;
};

const authenticateWallet = async (wallet, authorizationCode, codeVerifier) => {
  // call authorize
  console.log('calling authenticateWallet');

  var walletRequest = {
    accountAddress: wallet.accountAddress,
    chainId: wallet.chainId,
    signature: wallet.signature,
    authorizationCode: authorizationCode,
    codeVerifier: codeVerifier,
  };

  const response = await axios.post('/api/wallet/authenticate', walletRequest, {
    timeout: architectedConfig.timeout,
  });

  console.log('authenticateWallet:authenticate:' + JSON.stringify(response));

  return response;
};

const getSignatureMessage = (siteName, nonce) => {
  const message = `Hi there from ${siteName}! \n\n Please sign this message to prove you have access to this wallet so we can log you in. \n\n To stop hackers using your wallet, here’s a unique id they can’t guess: ${nonce}\n\n This won’t cost you any Ether.`;
  return message;
};
export { getWallet, createWallet, authenticateWallet, getSignatureMessage };