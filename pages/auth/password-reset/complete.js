import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetComplete from '../../../components/auth/passwordReset/passwordResetComplete';
import * as authActionType from 'architected-client/constants/iam.js';
import { urlConstants } from '../../../helper/urlConstants';

function CompletePasswordReset() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(urlConstants.get('PAGE_FILE_LIST'));
    }
  }, []);

  return (
    <>
      <PasswordResetComplete />
    </>
  );
}

export default CompletePasswordReset;
