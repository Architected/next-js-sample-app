import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailSignUp from '../../../../components/auth/signup/emailSignUp';
import { signUpAction } from '../../../../state/actions/auth/signUpEmail';
import * as authActionType from '../../../../state/constants/auth';
import { getClientDetails } from '../../../../helper/clientHelper';
import { urlConstants } from '../../../../helper/urlConstants';

function SignUpEmail() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { authState, callInProgress, errorMessage, warningMessage } =
    state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signupScope === 'FULL') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    const clientDetails = await getClientDetails();
    const responseData = await signUpAction(
      email,
      password,
      clientDetails,
      dispatch
    );

    if (responseData && !responseData.inError) {
      if (responseData.tokenWrapper.authState.signupScope === 'FULL') {
        router.push(urlConstants.get('PAGE_FILE_LIST'));
      }

      router.push(urlConstants.get('SIGNUP_EMAIL_VALIDATE'));
    }
  };

  return (
    <>
      <EmailSignUp
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default SignUpEmail;
