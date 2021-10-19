import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import { architectedConfig } from '../../architectedConfig';

function FooterNavigation() {
  const { state } = useContext(Store);
  const { authState } = state['auth'];
  const siteName =
    architectedConfig.siteName != ''
      ? architectedConfig.siteName
      : 'NEXT_PUBLIC_SITE_NAME from env.local';
  return (
    <div className="dashboard-footer">
      <div className="float-left">
        <span className="text-second ml-4">2021</span> © {siteName}
      </div>
      {!authState && (
        <div className="float-right">
          <Link href="/terms">
            <a className="text-second mr-4">Terms and Conditions</a>
          </Link>
          <Link href="/privacy">
            <a className="text-second mr-4">Privacy Policy</a>
          </Link>
        </div>
      )}
    </div>
  );
}

export default FooterNavigation;
