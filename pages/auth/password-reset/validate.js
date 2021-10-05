import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetValidate from '../../../components/auth/passwordreset/passwordResetValidate';
import { validateAction } from '../../../state/actions/auth/passwordReset';
import * as authActionType from '../../../state/constants/global';
import { PAGE_FILE_LIST } from '../../../helper/routeHelper';

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
      router.push(PAGE_FILE_LIST);
    }
    if (!bearerToken || !bearerToken.tokenValue) {
      router.push('/');
    }
    return () => {
      console.log('cleanup');
    };
  }, []);

  const submitHandler = async ({ code }) => {
    const inputData = { code, tokenValue: bearerToken.tokenValue };
    const responseData = await validateAction(inputData, dispatch);

    if (!responseData.inError) {
      router.push('/auth/password-reset/perform');
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
