import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import { signInAction } from '../../../../state/actions/auth/signInEmail';
import * as authActionType from '../../../../state/constants/auth';
import { getClientDetails } from '../../../../helper/clientHelper';
import { nextStep } from '../../../../helper/scopeHelper';
import { urlConstants } from '../../../../helper/urlConstants';
import { saveToStore } from '../../../../helper/storageHelper';

import EmailSignIn from '../../../../components/auth/signin/emailSignIn';

function SignInEmail() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState, callInProgress, errorMessage, warningMessage } =
    state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  }, []);

  const submitHandler = async ({ email, password }) => {
    const clientDetails = await getClientDetails();
    const responseData = await signInAction(
      email,
      password,
      clientDetails,
      dispatch
    );

    if (responseData && !responseData.inError) {
      saveToStore('_tokenWrapper', responseData.tokenWrapper);
      var nextUrl = await nextStep(responseData.tokenWrapper);
      router.push(nextUrl);
    }
  };

  return (
    <>
      <EmailSignIn
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default SignInEmail;
