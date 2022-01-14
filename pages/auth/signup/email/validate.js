import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailValidate from '../../../../components/auth/signup/emailValidate';
import * as authActionType from '../../../../state/constants/auth';
import { urlConstants } from '../../../../helper/urlConstants';
import {
  verifyEmailAction,
  validateEmailAction,
} from '../../../../state/actions/auth/signUpEmail';

function SignUpEmailValidate() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const [resendInProgress, setResendInProgress] = useState(false);
  const {
    authState,
    callInProgress,
    errorMessage,
    warningMessage,
    successMessage,
    bearerToken,
  } = state['auth'];

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState == null || bearerToken == null) {
      router.push('/');
    } else if (authState && authState.signupScope === 'FULL') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const submitHandler = async ({ code }) => {
    if (!resendInProgress) {
      const responseData = await validateEmailAction(
        code,
        bearerToken.tokenValue,
        dispatch
      );

      if (responseData && !responseData.inError) {
        router.push(urlConstants.get('SIGNUP_COMPLETE'));
      }
    }
  };

  const resendHandler = async () => {
    setResendInProgress(true);
    const responseData = await verifyEmailAction(
      bearerToken.tokenValue,
      dispatch
    );
    setResendInProgress(false);
  };

  return (
    <>
      <EmailValidate
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        successMessage={successMessage}
        resendHandler={resendHandler}
      />
    </>
  );
}

export default SignUpEmailValidate;
