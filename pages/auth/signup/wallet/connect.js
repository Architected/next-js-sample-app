import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import WalletConnect from '../../../../components/auth/signup/walletConnect';
import { walletService } from '../../../../service/walletServices.js';
import * as authActionType from 'architected-client/constants/iam.js';
import { urlConstants } from '../../../../helper/urlConstants';

function SignupWalletConnect() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    authState,
    callInProgress,
    errorMessage,
    warningMessage,
    bearerToken,
  } = state['auth'];

  // redirect if logged in
  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState == null || bearerToken == null) {
      router.push('/');
    } else if (authState && authState.signupScope === 'FULL') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  }, []);

  const submitHandler = async ({ email }) => {
    var requestData = {
      email,
      tokenValue: bearerToken.tokenValue,
    };

    var data = await walletService.signUpConnectWallet(requestData, dispatch);

    if (data && !data.inError) {
      router.push('/auth/signup/wallet/validate');
    }
  };

  return (
    <>
      <WalletConnect
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default SignupWalletConnect;
