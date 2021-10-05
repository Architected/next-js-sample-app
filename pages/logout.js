import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../state/storeProvider';
import { signOutAction } from '../state/actions/auth/signInEmail';

function LogOut() {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  useEffect(() => {
    signOutAction(dispatch);
    router.push('/');
  });

  return <></>;
}

export default LogOut;
