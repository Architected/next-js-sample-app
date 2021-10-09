import startAuthorize from '../../../helper/authorizeHelper';
import Web3 from 'web3';
import * as authActionType from '../../constants/auth';
import {
  getWallet,
  createWallet,
  getSignatureMessage,
  authenticateWallet,
} from '../../../helper/walletHelper';
import { architectedConfig } from '../../../architectedConfig';
import CryptoHelper from '../../../service/cryptoHelper';

const getWalletAction = async (wallet, clientDetails) => {
  const cryptoHelper = new CryptoHelper();
  const codeVerifier = await cryptoHelper.generateCodeVerifier();
  const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

  if (!authorizeResponse || authorizeResponse.data.inError) {
    return authorizeResponse;
  }

  const getWalletResponse = await getWallet(
    wallet,
    authorizeResponse.data.authorizationCode,
    codeVerifier
  );

  return getWalletResponse;
};

const createWalletAction = async (wallet, clientDetails) => {
  const cryptoHelper = new CryptoHelper();
  const codeVerifier = await cryptoHelper.generateCodeVerifier();
  const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

  if (!authorizeResponse || authorizeResponse.data.inError) {
    return authorizeResponse;
  }

  const createWalletResponse = await createWallet(
    wallet,
    authorizeResponse.data.authorizationCode,
    codeVerifier
  );

  return createWalletResponse;
};

const getAccountAndChain = async (dispatch) => {
  var wallet = { success: false, type: '', reason: '' };
  let retrievedAccountAddress = '';
  let retrievedChainId = '';

  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else {
      wallet.type = authActionType.METAMASK_ERROR_ACCOUNT;
      wallet.reason =
        'Please use an ethereum enabled browser with metamask installed.';
      return wallet;
    }

    retrievedChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    console.log('retrievedChainId:' + retrievedChainId);

    if (retrievedChainId != architectedConfig.chainId) {
      wallet.type = authActionType.METAMASK_ERROR_ACCOUNT;
      wallet.reason =
        'Invalid chain please select ' +
        architectedConfig.chainName +
        ' from Metamask';
      return wallet;
    }

    if (!retrievedChainId) {
      wallet.type = authActionType.METAMASK_ERROR_ACCOUNT;
      wallet.reason = 'Invalid chain please connect to meta mask ';
      return wallet;
    }

    dispatch({
      type: authActionType.METAMASK_SET_CHAIN,
      payload: retrievedChainId,
    });

    const newAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    retrievedAccountAddress = newAccounts[0];
    console.log('retrievedAccountAddress:' + retrievedAccountAddress);

    dispatch({
      type: authActionType.METAMASK_SET_ACCOUNT,
      payload: retrievedAccountAddress,
    });
  } catch (err) {
    console.error(err);

    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      wallet.type = authActionType.METAMASK_ERROR_ACCOUNT;
      wallet.reason = 'Please connect to MetaMask to continue.';
    } else {
      wallet.type = authActionType.METAMASK_ERROR_ACCOUNT;
      wallet.reason = 'Unexpected error connecting to MetaMask.';
    }
    return wallet;
  }

  return {
    ...wallet,
    accountAddress: retrievedAccountAddress,
    chainId: retrievedChainId,
    success: true,
  };
};

const authenticateSignature = async (wallet, clientDetails) => {
  const cryptoHelper = new CryptoHelper();
  const codeVerifier = await cryptoHelper.generateCodeVerifier();
  const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

  if (authorizeResponse.inError) {
    console.log('authorize failed');
    return;
  }

  const { data } = await authenticateWallet(
    wallet,
    authorizeResponse.data.authorizationCode,
    codeVerifier
  );

  return data;
};

export const walletSignInAction = async (clientDetails, dispatch) => {
  try {
    dispatch({ type: authActionType.USER_SIGNIN_START });

    var wallet = await getAccountAndChain(dispatch);

    if (!wallet.success) {
      console.log('failed to getAccountAndChain');
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: wallet.reason,
      });
      return;
    }

    const getWalletResponse = await getWalletAction(wallet, clientDetails);

    if (!getWalletResponse || getWalletResponse.data.inError) {
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: 'Error occurred validating you account',
      });
      return;
    }

    let nonce = getWalletResponse.data.match
      ? getWalletResponse.data.nonce
      : '';

    if (!nonce) {
      const createWalletResponse = await createWalletAction(
        wallet,
        clientDetails
      );

      if (!createWalletResponse || createWalletResponse.data.inError) {
        console.log('sign in fail');
        dispatch({
          type: authActionType.USER_SIGNIN_FAIL,
          payload: 'Error occurred validating you account',
        });
        return;
      }

      nonce = createWalletResponse.data.nonce;
    }

    if (!nonce) {
      console.log('Unable to determine a nonce');
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: 'Error occurred validating you account',
      });
      return;
    }

    const message = getSignatureMessage(architectedConfig.siteName, nonce);

    const sigVal = await window.web3.eth.personal.sign(
      message,
      wallet.accountAddress
    );

    wallet.signature = sigVal;

    const signatureResponseData = await authenticateSignature(
      wallet,
      clientDetails
    );

    if (!signatureResponseData || signatureResponseData.inError) {
      console.log('authenticateSignature fail');
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: 'Error occurred validating you account',
      });
      return;
    }

    dispatch({
      type: authActionType.USER_SIGNIN_SUCCESS,
      payload: signatureResponseData.tokenWrapper,
    });

    return signatureResponseData;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.USER_SIGNIN_FAIL,
      payload: err.toString(),
    });
  }
};
