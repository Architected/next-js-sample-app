import { architectedConfig } from '../architectedConfig';
import startAuthorize from '../helper/authorizeHelper';

import * as authActionType from 'architected-client/app-state/constants/iam.js';
import { ArchitectedFrontChannel } from 'architected-client/api-wrapper/architectedFrontChannel.js';

import Web3 from 'web3';
import { getError } from 'architected-client/helper/getError';
import { CryptoHelper } from 'architected-crypto-helper';

class WalletService {
  init(config, cryptoHelper, authorizeHandler) {
    this.frontChannelService = new ArchitectedFrontChannel();
    this.frontChannelService.init(config);
    this.cryptoHelper = cryptoHelper;
    this.startAuthorize = authorizeHandler;
  }

  getSignatureMessage = (siteName, nonce) => {
    const message = `Hi there from ${siteName}! \n\n Please sign this message to prove you have access to this wallet so we can log you in. \n\n To stop hackers using your wallet, here’s a unique id they can’t guess: ${nonce}\n\n This won’t cost you any Ether.`;
    return message;
  };

  getWallet = async (wallet, clientDetails) => {
    const codeVerifier = this.cryptoHelper.generateCodeVerifier();
    const authorizeResponse = await this.startAuthorize(
      codeVerifier,
      clientDetails
    );

    if (!authorizeResponse || authorizeResponse.data.inError) {
      return authorizeResponse;
    }

    var request = {
      accountAddress: wallet.accountAddress,
      chainId: wallet.chainId,
      authorizationCode: authorizeResponse.data.authorizationCode,
      codeVerifier: codeVerifier,
    };

    const response = await this.frontChannelService.wallet().getWallet(request);

    return response;
  };

  createWallet = async (wallet, clientDetails) => {
    const codeVerifier = this.cryptoHelper.generateCodeVerifier();
    const authorizeResponse = await this.startAuthorize(
      codeVerifier,
      clientDetails
    );

    var request = {
      accountAddress: wallet.accountAddress,
      chainId: wallet.chainId,
      authorizationCode: authorizeResponse.data.authorizationCode,
      codeVerifier: codeVerifier,
    };

    const response = await this.frontChannelService
      .wallet()
      .createWallet(request);

    return response;
  };

  validateChain = async (dispatch) => {
    var validateResponse = { success: false, errorType: '', reason: '' };
    let retrievedChainId = '';

    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
      } else {
        validateResponse.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        validateResponse.reason =
          'Please use an ethereum enabled browser with metamask installed.';
        return validateResponse;
      }

      retrievedChainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      console.log('retrievedChainId:' + retrievedChainId);

      if (!retrievedChainId) {
        validateResponse.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        validateResponse.reason = 'Invalid chain please connect to meta mask ';
        return validateResponse;
      }

      if (retrievedChainId != architectedConfig.chainId) {
        validateResponse.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        validateResponse.reason =
          'Invalid chain please select ' +
          architectedConfig.chainName +
          ' from Metamask';
        return validateResponse;
      }

      dispatch({
        type: authActionType.METAMASK_SET_CHAIN,
        payload: retrievedChainId,
      });
    } catch (err) {
      console.log(err);
      if (err.code === 32002) {
        validateResponse.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        validateResponse.reason =
          'Please ensure your Metamask account is unlocked and refresh the page.';
      } else {
        validateResponse.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        validateResponse.reason = 'Unexpected error connecting to MetaMask.';
      }
      return validateResponse;
    }

    return {
      ...validateResponse,
      chainId: retrievedChainId,
      success: true,
    };
  };

  initializeWalletAccount = async (dispatch) => {
    var walletAccount = { success: false, errorType: '', reason: '' };
    let retrievedAccountAddress = '';

    try {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
      } else {
        walletAccount.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
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
        walletAccount.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        walletAccount.reason = 'Please connect to MetaMask to continue.';
      } else {
        walletAccount.errorType = authActionType.METAMASK_ERROR_ACCOUNT;
        walletAccount.reason = 'Unexpected error connecting to MetaMask.';
      }
      return walletAccount;
    }
  };

  authenticateSignature = async (wallet, clientDetails) => {
    const codeVerifier = this.cryptoHelper.generateCodeVerifier();
    const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

    if (authorizeResponse.inError) {
      console.log('authorize failed');
      return;
    }

    var request = {
      accountAddress: wallet.accountAddress,
      chainId: wallet.chainId,
      signature: wallet.signature,
      authorizationCode: authorizeResponse.data.authorizationCode,
      codeVerifier: codeVerifier,
    };

    const { data } = await this.frontChannelService
      .wallet()
      .authenticateWallet(request);

    return data;
  };

  walletSignIn = async (clientDetails, dispatch) => {
    try {
      dispatch({ type: authActionType.USER_SIGNIN_START });

      const walletChain = await this.validateChain(dispatch);

      if (!walletChain.success) {
        console.log('failed to validateChain');
        dispatch({
          type: authActionType.USER_SIGNIN_FAIL,
          payload: walletChain.reason,
        });
        return;
      }

      var walletAccount = await this.initializeWalletAccount(dispatch);

      if (!walletAccount.success) {
        console.log('failed to initializeWalletAccount');
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

      const getWalletResponse = await this.getWallet(wallet, clientDetails);

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
        const createWalletResponse = await this.createWallet(
          wallet,
          clientDetails
        );

        if (!createWalletResponse || createWalletResponse.data.inError) {
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

      const message = this.getSignatureMessage(
        architectedConfig.siteName,
        nonce
      );

      const signature = await window.web3.eth.personal.sign(
        message,
        wallet.accountAddress
      );

      if (!signature) {
        console.log('sigVal is empty');
        dispatch({
          type: authActionType.USER_SIGNIN_FAIL,
          payload: 'Unable to perform sign in with wallet',
        });
        return;
      }

      wallet.signature = signature;

      const signatureResponseData = await this.authenticateSignature(
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
      console.log(err.message);
      if (err.code == 4001) {
        dispatch({
          type: authActionType.USER_SIGNIN_FAIL,
          payload: 'Unable to perform sign in with wallet',
        });
        return;
      }
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: err.toString(),
      });
    }
  };

  signUpConnectWallet = async (requestData, dispatch) => {
    try {
      dispatch({ type: authActionType.USER_WALLET_CONNECT_START });

      var connectRequest = {
        identifier: requestData.email,
        identifierType: 'EMAIL',
      };

      const { data } = await this.frontChannelService
        .signUp()
        .walletConnect(connectRequest, requestData.tokenValue);

      if (data && data.inError) {
        dispatch({
          type: authActionType.USER_WALLET_CONNECT_FAIL,
          payload: getError(data),
        });
      } else {
        dispatch({
          type: authActionType.USER_WALLET_CONNECT_SUCCESS,
          payload: data.globalId,
        });
      }
      return data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: authActionType.USER_WALLET_CONNECT_FAIL,
        payload: err.toString(),
      });
    }
  };

  signUpValidateWallet = async (requestData, dispatch) => {
    try {
      dispatch({ type: authActionType.USER_WALLET_VALIDATE_START });

      var validateRequest = {
        globalId: requestData.verificationGlobalId,
        code: requestData.code,
      };

      const { data } = await this.frontChannelService
        .signUp()
        .walletValidate(validateRequest, requestData.tokenValue);

      if (data && data.inError) {
        dispatch({
          type: authActionType.USER_WALLET_VALIDATE_FAIL,
          payload: getError(data),
        });
      } else {
        dispatch({
          type: authActionType.USER_WALLET_VALIDATE_SUCCESS,
          payload: data.tokenWrapper,
        });
      }

      return data;
    } catch (err) {
      console.log(err);
      dispatch({
        type: authActionType.USER_WALLET_VALIDATE_FAIL,
        payload: err.toString(),
      });
    }
  };
}

const walletService = (() => {
  const cryptoHelper = new CryptoHelper();
  const instance = new WalletService();
  instance.init(architectedConfig, cryptoHelper, startAuthorize);
  return instance;
})();

export { walletService };
