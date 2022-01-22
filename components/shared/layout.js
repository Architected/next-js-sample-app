import TopNavigation from './topNavigation';
import FooterNavigation from './footerNavigation';
import LeftNavigation from './leftNavigation';
import Head from 'next/head';
import React, { useContext } from 'react';
import { Store } from '../../state/storeProvider';
import Script from 'next/script';
function Layout(props) {
  const { state } = useContext(Store);
  const { marketPlace, authState } = state['auth'];

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        crossOrigin="anonymous"
        async
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        crossOrigin="anonymous"
        async
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        crossOrigin="anonymous"
        async
        strategy="afterInteractive"
      ></Script>
      {(authState && authState.signinScope === 'COMPLETE') || marketPlace ? (
        <div className="dashboard-wrap">
          <TopNavigation />
          <LeftNavigation />
          <main className="main">{props.children}</main>
        </div>
      ) : (
        <div>
          <TopNavigation />
          <main className="main">{props.children}</main>
          <FooterNavigation />
        </div>
      )}
    </>
  );
}

export default Layout;
