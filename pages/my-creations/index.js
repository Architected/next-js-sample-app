import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import TokenGrid from '../../components/file/tokenGrid';
import { getSigner, getProvider } from '../../helper/walletHelper';
import * as fileActionType from '../../state/constants/file';
import * as authActionType from '../../state/constants/auth';
import {
  getTokenContract,
  getMarketContract,
  mapToken,
} from '../../helper/contractHelper';

function MyCreations() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { authState, bearerToken } = state['auth'];
  const { isLoadingList, loadingError } = state['file'];
  const [nfts, setNfts] = useState([]);

  async function getCreatedItems() {
    try {
      dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });
      const signer = await getSigner();
      const provider = await getProvider();

      const marketContract = getMarketContract(signer);
      const tokenContract = getTokenContract(provider);
      const data = await marketContract.fetchItemsCreated();

      const items = await Promise.all(
        data.map(async (i) => {
          return mapToken(tokenContract, i);
        })
      );

      dispatch({ type: fileActionType.FILELIST_FETCH_SUCCESS, payload: [] });
      return items;
    } catch (err) {
      console.log(err);
      dispatch({
        type: fileActionType.FILELIST_FETCH_FAIL,
        payload: 'An error has occured',
      });
    }
  }

  useEffect(() => {
    let isMounted = true;
    console.log('isMounted' + true);

    if (authState == null || bearerToken == null) {
      router.push('/');
    } else {
      dispatch({ type: authActionType.INIT_MARKETPLACE_LAYOUT });

      getCreatedItems().then((items) => {
        if (isMounted) setNfts(items);
      });
    }

    return () => {
      isMounted = false;
      console.log('isMounted' + false);
    };
  }, []);

  return (
    <>
      <div className="dashboard-content">
        <div className="container-fluid">
          <TokenGrid
            title="My Creations"
            action="created"
            isLoadingList={isLoadingList}
            loadingError={loadingError}
            nfts={nfts}
          />
        </div>
      </div>
    </>
  );
}

export default MyCreations;
