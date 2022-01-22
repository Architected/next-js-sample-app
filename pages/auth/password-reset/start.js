import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../../state/storeProvider';
import PasswordResetStart from '../../../components/auth/passwordReset/passwordResetStart';
import * as authActionType from 'architected-client/app-state/constants/iam.js';
import { urlConstants } from '../../../helper/urlConstants';
import { getClientDetails } from '../../../helper/clientHelper';
import { iamClient } from '../../../service/defaultServices';

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
    const responseData = await iamClient.passwordResetStart(
      email,
      clientDetails,
      dispatch
    );

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
