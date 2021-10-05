import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetPerform from '../../../components/auth/passwordreset/passwordResetPerform';
import { performAction } from '../../../state/actions/auth/passwordReset';
import * as authActionType from '../../../state/constants/global';
import { PAGE_FILE_LIST } from '../../../helper/routeHelper';

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
      router.push(PAGE_FILE_LIST);
    }

    return () => {
      console.log('cleanup');
    };
  }, []);

  const submitHandler = async ({ newPassword, confirmPassword }) => {
    const inputData = {
      newPassword,
      confirmPassword,
      additionalData,
      tokenValue: bearerToken.tokenValue,
    };
    const responseData = await performAction(inputData, dispatch);

    if (!responseData.inError) {
      router.push('/auth/password-reset/complete');
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
