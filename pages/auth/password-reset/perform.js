import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetPerform from '../../../components/auth/passwordReset/passwordResetPerform';
import { iamClient } from '../../../service/defaultServices';
import * as authActionType from 'architected-client/app-state/constants/iam.js';
import { urlConstants } from '../../../helper/urlConstants';

function PerformPasswordReset() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const {
    authState,
    bearerToken,
    additionalData,
    callInProgress,
    errorMessage,
    warningMessage,
  } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }

    return () => {
      console.log('cleanup');
    };
  }, []);

  const submitHandler = async ({ newPassword, confirmPassword }) => {
    const responseData = await iamClient.passwordResetPerform(
      newPassword,
      confirmPassword,
      dispatch,
      additionalData,
      bearerToken.tokenValue
    );

    if (responseData && !responseData.inError) {
      router.push(urlConstants.get('PASSWORD_RESET_COMPLETE'));
    }
  };

  return (
    <>
      <PasswordResetPerform
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default PerformPasswordReset;
