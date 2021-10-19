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

export const initWalletChain = async (dispatch) => {
  var chain = { success: false, type: '', reason: '' };
  let retrievedChainId = '';

  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else {
      chain.type = authActionType.METAMASK_ERROR_ACCOUNT;
      chain.reason =
        'Please use an ethereum enabled browser with metamask installed.';
      return chain;
    }

    retrievedChainId = await window.ethereum.request({
      method: 'eth_chainId',
    });

    console.log('retrievedChainId:' + retrievedChainId);

    if (!retrievedChainId) {
      chain.type = authActionType.METAMASK_ERROR_ACCOUNT;
      chain.reason = 'Invalid chain please connect to meta mask ';
      return chain;
    }

    if (retrievedChainId != architectedConfig.chainId) {
      chain.type = authActionType.METAMASK_ERROR_ACCOUNT;
      chain.reason =
        'Invalid chain please select ' +
        architectedConfig.chainName +
        ' from Metamask';
      return chain;
    }

    dispatch({
      type: authActionType.METAMASK_SET_CHAIN,
      payload: retrievedChainId,
    });
  } catch (err) {
    console.log(err);
    if (err.code === 32002) {
      chain.type = authActionType.METAMASK_ERROR_ACCOUNT;
      chain.reason =
        'Please ensure your Metamask account is unlocked and refresh the page.';
    } else {
      chain.type = authActionType.METAMASK_ERROR_ACCOUNT;
      chain.reason = 'Unexpected error connecting to MetaMask.';
    }
    return chain;
  }

  return {
    ...chain,
    chainId: retrievedChainId,
    success: true,
  };
};

export const initWalletAccount = async (dispatch) => {
  var walletAccount = { success: false, type: '', reason: '' };
  let retrievedAccountAddress = '';

  try {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else {
      walletAccount.type = authActionType.METAMASK_ERROR_ACCOUNT;
      walletAccount.reason =
        'Please use an ethereum enabled browser with metamask installed.';
      return walletAccount;
    }

    const newAccounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    retrievedAccountAddress = newAccounts[0];
    console.log('retrievedAccountAddress:' + retrievedAccountAddress);

    dispatch({
      type: authActionType.METAMASK_SET_ACCOUNT,
      payload: retrievedAccountAddress,
    });

    return {
      ...walletAccount,
      accountAddress: retrievedAccountAddress,
      success: true,
    };
  } catch (err) {
    console.log(err);

    if (err.code === 4001) {
      // EIP-1193 userRejectedRequest error
      // If this happens, the user rejected the connection request.
      walletAccount.type = authActionType.METAMASK_ERROR_ACCOUNT;
      walletAccount.reason = 'Please connect to MetaMask to continue.';
    } else {
      walletAccount.type = authActionType.METAMASK_ERROR_ACCOUNT;
      walletAccount.reason = 'Unexpected error connecting to MetaMask.';
    }
    return walletAccount;
  }
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

    const walletChain = await initWalletChain(dispatch);

    if (!walletChain.success) {
      console.log('failed to initWalletChain');
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: walletChain.reason,
      });
      return;
    }

    var walletAccount = await initWalletAccount(dispatch);

    if (!walletAccount.success) {
      console.log('failed to initWalletAccount');
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: walletAccount.reason,
      });
      return;
    }

    const wallet = {
      chainId: walletChain.chainId,
      accountAddress: walletAccount.accountAddress,
    };

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
