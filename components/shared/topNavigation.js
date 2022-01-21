import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import Identicon from 'react-identicons';
import { architectedConfig } from '../../architectedConfig';
import { urlConstants } from '../../helper/urlConstants';
import { hasCompleteToken } from '../../helper/storageHelper';
import { useRouter } from 'next/router';

function TopNavigation() {
  const { state } = useContext(Store);
  const { authState, bearerToken } = state['auth'];
  const { asPath } = useRouter();
  const { marketPlace } = state['global'];
  const containerclassName = 'dashboard-header';
  const isLoggedIn = hasCompleteToken(authState, bearerToken);

  const signInUrl =
    architectedConfig.siteMode == 'dapp'
      ? '/auth/signin/wallet'
      : '/auth/signin/email';
  const signInTitle =
    architectedConfig.siteMode == 'dapp' ? 'Connect' : 'Sign in';

  const displayConnect =
    architectedConfig.siteMode == 'dapp' && asPath != '/auth/signin/wallet';
  return (
    <header className={containerclassName}>
      <div className="container-fluid">
        <div className="float-left">
          <Link href={authState ? urlConstants.get('PAGE_FILE_LIST') : '/'}>
            {architectedConfig.siteName != '' ? (
              <a className="logo">{architectedConfig.siteName}</a>
            ) : (
              <>
                <a className="logo">NEXT_PUBLIC_SITE_NAME</a> from env.local
              </>
            )}
          </Link>
        </div>
        {authState ? (
          isLoggedIn ? (
            <div className="float-right">
              <div className="dropdown float-left"></div>
              <div className="dropdown float-left ml-4"></div>
              <div className="dropdown float-left ml-4">
                {authState.identifier}&nbsp;&nbsp;
                <a
                  className="button dropdown-toggle"
                  href="#"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></a>
                <div className="dropdown-menu">
                  <Link href="/profile" passHref>
                    <a className="dropdown-item">My profile</a>
                  </Link>
                  <hr />
                  {architectedConfig.siteMode == 'app' && (
                    <>
                      <Link href="/changepassword" passHref>
                        <a className="dropdown-item">Change Password</a>
                      </Link>
                      <hr />
                    </>
                  )}
                  <Link href="/signout" passHref>
                    <a className="dropdown-item">Sign out</a>
                  </Link>
                </div>
              </div>
              <div className="dropdown float-left ml-3 mt-1">
                <Identicon string={authState.identifier} size={30} />
              </div>
              <div className="dashboard-menu-icon float-left ml-4">
                <i className="fas fa-bars"></i>
              </div>
            </div>
          ) : (
            <></>
          )
        ) : (
          <div className="float-right">
            <div className="dropdown float-left"></div>
            <div className="dropdown float-left ml-4"></div>
            <div className="dropdown float-left ml-4">
              {architectedConfig.siteMode == 'app' && (
                <Link href="/auth/signup/email" passHref>
                  <a className="button font-semibold">Sign up</a>
                </Link>
              )}

              {displayConnect && (
                <Link href={signInUrl} passHref>
                  <a className="button button-brand ml-2">{signInTitle}</a>
                </Link>
              )}
            </div>
            <div className="dropdown float-left ml-3 mt-1"></div>
            <div className="dashboard-menu-icon float-left ml-4"></div>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNavigation;
