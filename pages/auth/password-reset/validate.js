import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetValidate from '../../../components/auth/passwordReset/passwordResetValidate';
import { iamClient } from '../../../service/defaultServices';
import * as authActionType from 'architected-client/app-state/constants/iam.js';
import { urlConstants } from '../../../helper/urlConstants';

function ValidatePasswordReset() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    authState,
    bearerToken,
    callInProgress,
    errorMessage,
    warningMessage,
  } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
    if (!bearerToken || !bearerToken.tokenValue) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ code }) => {
    const responseData = await iamClient.passwordResetValidate(
      code,
      dispatch,
      bearerToken.tokenValue
    );

    if (responseData && !responseData.inError) {
      router.push(urlConstants.get('PASSWORD_RESET_PERFORM'));
    }
  };

  return (
    <>
      <PasswordResetValidate
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default ValidatePasswordReset;
