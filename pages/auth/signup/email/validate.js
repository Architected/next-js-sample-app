import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import EmailValidate from '../../../../components/auth/signup/emailValidate';
import { validateEmail } from '../../../state/actions/signUp';
import * as authActionType from '../../../../state/constants/auth';
import { PAGE_FILE_LIST } from '../../../../helper/routeHelper';

function SignUpEmailValidate() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { authState, isLoading, errorMessage, warningMessage, bearerToken } =
    state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState == null || bearerToken == null) {
      router.push('/');
    } else if (authState && authState.signupScope === 'FULL') {
      router.push(PAGE_FILE_LIST);
    }
  }, []);

  const submitHandler = async ({ code }) => {
    const requestData = {
      code: code,
      tokenValue: bearerToken.tokenValue,
    };

    const responseData = await validateEmail(requestData, dispatch);

    if (!responseData.inError) {
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
        isLoading={isLoading}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default SignUpEmailValidate;
