import React, { useContext } from 'react';
import Link from 'next/link';
import { Store } from '../../state/storeProvider';
import { architectedConfig } from '../../architectedConfig';

function FooterNavigation() {
  const { state } = useContext(Store);
  const { authState } = state['auth'];

  return (
    <div className="dashboard-footer">
      <div className="float-left">
        <span className="text-second ml-4">2021</span> ©{' '}
        {architectedConfig.siteName}
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
