import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import { architectedConfig } from '../../architectedConfig';
import { PAGE_FILE_LIST } from '../../helper/routeHelper';

function LeftNavigation() {
  const { state } = useContext(Store);
  const { authState } = state['auth'];

  return (
    <div className="dashboard-sidebar">
      <div className="scroll">
        <div className="flex">
          <div>
            <ul className="menu-nav">
              {architectedConfig.siteMode == 'dapp' && (
                <>
                  <li>
                    <Link href="/marketplace">
                      <a>
                        <div className="icon">
                          <i className="fas fa-store"></i>
                        </div>
                        <span>/ Marketplace </span>
                      </a>
                    </Link>
                  </li>
                  {authState && (
                    <>
                      <li>
                        <Link href="/my-creations">
                          <a>
                            <div className="icon">
                              <i className="fas fa-stroopwafel"></i>
                            </div>
                            <span>/ NFTs Created </span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/my-sales">
                          <a>
                            <div className="icon">
                              <i className="fas fa-coins"></i>
                            </div>
                            <span>/ NFTs Sold </span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href="/my-purchases">
                          <a>
                            <div className="icon">
                              <i className="fas fa-cash-register"></i>
                            </div>
                            <span>/ NFTs Purchased </span>
                          </a>
                        </Link>
                      </li>
                      <li>
                        <Link href={PAGE_FILE_LIST}>
                          <a>
                            <div className="icon">
                              <i className="far fa-folder"></i>
                            </div>
                            <span>/ My Files</span>
                          </a>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}

              {architectedConfig.siteMode == 'app' && (
                <>
                  <li>
                    <Link href={PAGE_FILE_LIST}>
                      <a>
                        <div className="icon">
                          <i className="far fa-folder"></i>
                        </div>
                        <span>/ My Files</span>
                      </a>
                    </Link>
                  </li>
                </>
              )}
              {/* <li>
                <Link href="/tags">
                  <a>
                    <div className="icon">
                      <i className="fas fa-tags"></i>
                    </div>
                    <span>My Tags</span>
                  </a>
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftNavigation;
