import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import { walletSignInAction } from '../../../../state/actions/auth/signInWallet';
import * as authActionType from '../../../../state/constants/auth';
import { getClientDetails } from '../../../../helper/clientHelper';
import { nextStep } from '../../../../helper/scopeHelper';
import { urlConstants } from '../../../../helper/urlConstants';
import { saveToStore } from '../../../../helper/storageHelper';

import MetaMaskSignIn from '../../../../components/auth/signin/metaMaskSignIn';

function SignInWallet() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState, callInProgress, errorMessage, warningMessage } =
    state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(urlConstants.get('PAGE_MARKETPLACE'));
    }
  }, []);

  const walletSubmitHandler = async () => {
    const clientDetails = await getClientDetails();
    var responseData = await walletSignInAction(clientDetails, dispatch);
    if (responseData && !responseData.inError) {
      saveToStore('_tokenWrapper', responseData.tokenWrapper);
      var nextUrl = await nextStep(responseData.tokenWrapper);
      router.push(nextUrl);
    }
  };

  return (
    <>
      <MetaMaskSignIn
        submitHandler={walletSubmitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default SignInWallet;
