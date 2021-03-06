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
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
          async
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
          async
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.8.2/css/all.css"
          integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay"
          crossOrigin="anonymous"
        />
      </Head>
      <Script
        src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
        crossOrigin="anonymous"
        strategy="beforeInteractive"
      ></Script>
      <Script
        src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
        crossOrigin="anonymous"
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
