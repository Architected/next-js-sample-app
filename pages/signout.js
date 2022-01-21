import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../state/storeProvider';
import { iamService } from '../service/defaultServices';
import { deleteFromStore } from '../helper/storageHelper';

function SignOut() {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  useEffect(() => {
    let isMounted = true;
    console.log('calling signOutAction');

    iamService.signOut(dispatch).then(() => {
      if (isMounted) {
        deleteFromStore('_tokenWrapper');
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

export default SignOut;
