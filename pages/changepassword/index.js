import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import PasswordChangePerform from '../../components/passwordchange/passwordChangePerform';
import { changePasswordAction } from '../../state/actions/profile';

function ChangePassword() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    authState,
    bearerToken,
    callInProgress,
    errorMessage,
    warningMessage,
  } = state['auth'];

  // redirect if logged in
  useEffect(() => {
    if (authState == null || bearerToken == null) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ newPassword, confirmPassword }) => {
    await changePasswordAction(
      newPassword,
      confirmPassword,
      dispatch,
      bearerToken.tokenValue
    );
  };

  return (
    <>
      <PasswordChangePerform
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
      />
    </>
  );
}

export default ChangePassword;
