import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import Identicon from 'react-identicons';
import { architectedConfig } from '../../architectedConfig';
import { PAGE_FILE_LIST } from '../../helper/routeHelper';

function TopNavigation() {
  const { state } = useContext(Store);
  const { authState } = state['auth'];
  const { marketPlace } = state['global'];
  const containerclassName =
    authState || marketPlace ? 'dashboard-header' : 'header';

  const signInUrl =
    architectedConfig.siteMode == 'dapp'
      ? '/auth/signin/wallet'
      : '/auth/signin/email';
  const signInTitle =
    architectedConfig.siteMode == 'dapp' ? 'Connect' : 'Sign in';

  return (
    <header className={containerclassName}>
      <div className="container-fluid">
        <div className="float-left">
          <Link href={authState ? PAGE_FILE_LIST : '/'}>
            <a className="logo">{architectedConfig.siteName}</a>
          </Link>
        </div>
        {authState ? (
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
                <Link href="/logout" passHref>
                  <a className="dropdown-item">Log out</a>
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
          <div className="float-right">
            <div className="user-control float-left ml-4">
              {architectedConfig.siteMode == 'app' && (
                <Link href="/auth/signup/email" passHref>
                  <a className="button font-semibold">Sign up</a>
                </Link>
              )}
              <Link href={signInUrl} passHref>
                <a className="button button-brand ml-2">{signInTitle}</a>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default TopNavigation;
