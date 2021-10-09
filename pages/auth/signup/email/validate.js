import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailValidate from '../../../../components/auth/signup/emailValidate';
import * as authActionType from '../../../../state/constants/auth';
import { PAGE_FILE_LIST } from '../../../../helper/routeHelper';
import { validateEmailAction } from '../../../../state/actions/auth/signUpEmail';

function SignUpEmailValidate() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    authState,
    callInProgress,
    errorMessage,
    warningMessage,
    bearerToken,
  } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState == null || bearerToken == null) {
      router.push('/');
    } else if (authState && authState.signupScope === 'FULL') {
      router.push(PAGE_FILE_LIST);
    }
  }, []);

  const submitHandler = async ({ code }) => {
    const responseData = await validateEmailAction(
      code,
      bearerToken.tokenValue,
      dispatch
    );

    if (responseData && !responseData.inError) {
      router.push(PAGE_FILE_LIST);
    }
  };

  const resendHandler = async () => {
    const requestData = {
      tokenValue: bearerToken.tokenValue,
    };

    await verifyEmailAction(requestData, dispatch);
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

export default SignUpEmailValidate;
