import Head from 'next/head';
import HomeScreen from '../components/home';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../state/storeProvider';
import { architectedConfig } from '../architectedConfig';
import * as authActionType from '../state/constants/auth';
import { PAGE_FILE_LIST } from '../helper/routeHelper';

export default function Home() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { authState } = state['auth'];

  useEffect(() => {
    dispatch({ type: authActionType.INIT_DEFAULT_LAYOUT });
    if (authState && authState.signinScope === 'COMPLETE') {
      router.push(PAGE_FILE_LIST);
    }
  }, [authState]);

  const title = `Welcome to ${architectedConfig.siteName}`;

  return (
    <>
      <Head>
        <title>{architectedConfig.siteName}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomeScreen />
    </>
  );
}
