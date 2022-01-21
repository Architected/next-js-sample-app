import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import PasswordChangePerform from '../../components/passwordchange/passwordChangePerform';
import { profileService } from '../../service/defaultServices';

function ChangePassword() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    authState,
    bearerToken,
    callInProgress,
    errorMessage,
    warningMessage,
    successMessage,
  } = state['auth'];

  // redirect if logged in
  useEffect(() => {
    if (authState == null || bearerToken == null) {
      router.push('/');
    }
  }, []);

  const submitHandler = async ({ currentPassword, newPassword }) => {
    const responseData = await profileService.changePassword(
      currentPassword,
      newPassword,
      dispatch,
      bearerToken.tokenValue
    );
    console.log('responseData:' + JSON.stringify(responseData));
  };

  return (
    <>
      <PasswordChangePerform
        submitHandler={submitHandler}
        isLoading={callInProgress}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        successMessage={successMessage}
      />
    </>
  );
}

export default ChangePassword;
