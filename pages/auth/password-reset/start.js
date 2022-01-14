import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetStart from '../../../components/auth/passwordReset/passwordResetStart';
import { startAction } from '../../../state/actions/auth/passwordReset';
import * as authActionType from '../../../state/constants/auth';
import { urlConstants } from '../../../helper/urlConstants';
import { getClientDetails } from '../../../helper/clientHelper';

function StartPasswordReset() {
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

  const submitHandler = async ({ email }) => {
    const clientDetails = await getClientDetails();
    const responseData = await startAction(email, clientDetails, dispatch);

    if (responseData && !responseData.inError && responseData.tokenWrapper) {
      router.push(urlConstants.get('PASSWORD_RESET_VALIDATE'));
    }
  };

  return (
    <>
      <PasswordResetStart
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default StartPasswordReset;
