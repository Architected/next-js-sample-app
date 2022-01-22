import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailValidate from '../../../../components/auth/signup/emailValidate';
import { walletService } from '../../../../service/walletServices.js';
import * as authActionType from 'architected-client/app-state/constants/iam.js';
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
      code: code,
      verificationGlobalId: verificationGlobalId,
      tokenValue: bearerToken.tokenValue,
    };
    console.log('requestData:' + JSON.stringify(requestData));
    var data = await walletService.signUpValidateWallet(requestData, dispatch);

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
