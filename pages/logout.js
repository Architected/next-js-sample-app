import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../state/storeProvider';
import { signOutAction } from '../state/actions/auth/signInEmail';

function LogOut() {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  useEffect(() => {
    let isMounted = true;
    console.log('calling signOutAction');
    signOutAction(dispatch).then(() => {
      if (isMounted) {
        console.log('redirect to home');
        router.push('/');
      }
    });

    return () => {
      isMounted = false;
    };
  });

  return <></>;
}

export default LogOut;
