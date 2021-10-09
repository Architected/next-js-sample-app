import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetComplete from '../../../components/auth/passwordReset/passwordResetComplete';
import * as authActionType from '../../../state/constants/auth';
import { PAGE_FILE_LIST } from '../../../helper/routeHelper';

function CompletePasswordReset() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });

    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(PAGE_FILE_LIST);
    }
  }, []);

  return (
    <>
      <PasswordResetComplete />
    </>
  );
}

export default CompletePasswordReset;
