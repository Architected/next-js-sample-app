import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailValidate from '../../../../components/auth/signup/emailValidate';
import { validateWalletAction } from '../../../../state/actions/auth/signUpWallet';
import * as authActionType from '../../../../state/constants/auth';
import { urlConstants } from '../../../../helper/urlConstants';

function Validate() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    authState,
    callInProgress,
    errorMessage,
    warningMessage,
    bearerToken,
    verificationGlobalId,
  } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });
    if (authState == null || bearerToken == null) {
      router.push('/');
    } else if (authState && authState.signupScope === 'FULL') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  }, []);

  const submitHandler = async ({ code }) => {
    var requestData = {
      code,
      verificationGlobalId,
      tokenValue: bearerToken.tokenValue,
    };

    var data = await validateWalletAction(requestData, dispatch);

    if (!data.inError) {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  };

  return (
    <>
      <EmailValidate
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default Validate;
