import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import { architectedConfig } from '../../architectedConfig';
import { PAGE_FILE_LIST } from '../../helper/routeHelper';

function LeftNavigation() {
  const { state } = useContext(Store);
  const { asPath } = useRouter();
  const { authState } = state['auth'];

  const NavLink = (props) => {
    //console.log('asPath:' + asPath);
    //console.log('props.href:' + props.href);
    //console.log('props.as:' + props.as);

    // pages/x.js will be matched via props.href
    // pages/[slug].js will be matched via props.as

    const className =
      asPath === props.href || asPath === props.as ? 'active' : '';

    return (
      <li className={className}>
        <Link href={props.href}>
          <a>
            <div className="icon">
              <i className={props.iconClassName}></i>
            </div>
            <span>{props.title}</span>
          </a>
        </Link>
      </li>
    );
  };

  return (
    <div className="dashboard-sidebar">
      <div className="scroll">
        <div className="flex">
          <div>
            <ul className="menu-nav">
              {architectedConfig.siteMode == 'dapp' && (
                <>
                  <NavLink
                    href="/marketplace"
                    iconClassName="fas fa-store"
                    title="/ Marketplace"
                  />
                  {authState && (
                    <>
                      <NavLink
                        href="/my-creations"
                        iconClassName="fas fa-stroopwafel"
                        title="/ NFTs Created"
                      />
                      <NavLink
                        href="/my-sales"
                        iconClassName="fas fa-coins"
                        title="/ NFTs Sold"
                      />
                      <NavLink
                        href="/my-purchases"
                        iconClassName="fas fa-cash-register"
                        title="/ NFTs Purchased"
                      />

                      <NavLink
                        href={PAGE_FILE_LIST}
                        iconClassName="far fa-folder"
                        title="/ My Files"
                      />
                    </>
                  )}
                </>
              )}

              {architectedConfig.siteMode == 'app' && (
                <>
                  <NavLink
                    href={PAGE_FILE_LIST}
                    iconClassName="far fa-folder"
                    title="/ My Files"
                  />
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavigation;
