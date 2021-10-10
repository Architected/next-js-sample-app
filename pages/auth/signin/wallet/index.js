import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import { PAGE_MARKETPLACE } from '../../../../helper/routeHelper';
import * as authActionType from '../../../../state/constants/auth';
import MetaMaskSignIn from '../../../../components/auth/signin/metaMaskSignIn';
import { nextStep } from '../../../../helper/scopeHelper';
import { walletSignInAction } from '../../../../state/actions/auth/signInWallet';
import { getClientDetails } from '../../../../helper/clientHelper';

function SignInWallet() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState, callInProgress, errorMessage, warningMessage } =
    state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(PAGE_MARKETPLACE);
    }
  }, []);

  const walletSubmitHandler = async () => {
    const clientDetails = await getClientDetails();
    var responseData = await walletSignInAction(clientDetails, dispatch);

    //console.log('SignInWallet:responseData:' + JSON.stringify(responseData));

    if (responseData && !responseData.inError) {
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
