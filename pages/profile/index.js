import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import {
  getProfileAction,
  saveProfileAction,
} from '../../state/actions/profile';
import UserDetailView from '../../components/profile/userDetailView';

function ProfileDetail() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState, bearerToken } = state['auth'];
  const { isLoadingItem, loadingError, isUpdatingItem, updatingError } =
    state['global'];

  const [profile, setProfile] = useState({
    globalId: '',
    firstName: '',
    middleName: '',
    lastName: '',
  });

  useEffect(() => {
    if (authState == null || bearerToken == null) {
      return router.push('/');
    } else {
      getProfile();
    }
  }, []);

  const getProfile = async () => {
    getProfileAction(dispatch, bearerToken.tokenValue).then((data) => {
      if (data && !data.InError) {
        setProfile(data);
      }
    });
  };

  const updateProfile = async (data) => {
    var profileUpdateRequest = {
      globalId: profile.globalId,
      firstName: data.firstName,
      middleName: data.middleName,
      lastName: data.lastName,
    };

    await saveProfileAction(
      profileUpdateRequest,
      dispatch,
      bearerToken.tokenValue
    );

    await getProfile();
  };

  return (
    <UserDetailView
      submitHandler={updateProfile}
      profile={profile}
      isLoadingItem={isLoadingItem}
      loadingError={loadingError}
      isUpdatingItem={isUpdatingItem}
      updatingError={updatingError}
    />
  );
}

export default ProfileDetail;
