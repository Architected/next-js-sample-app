import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../../state/storeProvider';
import EmailComplete from '../../../../components/auth/signup/emailComplete';
import * as authActionType from '../../../../state/constants/auth';
import { urlConstants } from '../../../../helper/urlConstants';

function SignUpEmailComplete() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { authState } = state['auth'];

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signupScope === 'FULL') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const navigateToSignIn = async () => {
    router.push('/auth/signin/email');
  };

  return (
    <>
      <EmailComplete navigateToSignInHandler={navigateToSignIn} />
    </>
  );
}

export default SignUpEmailComplete;
