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
  purchaseToken,
} from '../../helper/contractHelper';

function MarketPlace() {
  const { state, dispatch } = useContext(Store);
  const { isLoadingList, loadingError } = state['file'];
  const [nfts, setNfts] = useState([]);

  async function loadNFTs() {
    try {
      dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });

      const signer = await getSigner();
      const provider = await getProvider();

      const marketContract = getMarketContract(signer);
      const tokenContract = getTokenContract(provider);
      const data = await marketContract.fetchMarketItems();

      const items = await Promise.all(
        data.map(async (i) => {
          console.log('token: ' + JSON.stringify(i));
          return mapToken(tokenContract, i);
        })
      );

      setNfts(items);
      dispatch({ type: fileActionType.FILELIST_FETCH_SUCCESS, payload: [] });
    } catch (err) {
      console.log(err);
      dispatch({
        type: fileActionType.FILELIST_FETCH_FAIL,
        payload: 'An error has occured',
      });
    }
  }

  useEffect(() => {
    dispatch({ type: authActionType.INIT_MARKETPLACE_LAYOUT });
    loadNFTs();
  }, []);

  async function buyNFT(nft) {
    try {
      const signer = await getSigner();
      await purchaseToken(signer, nft);
      //router.push('/my-purchases');
    } catch (err) {
      console.log(err);
      console.log('A problem has occured with purchase');
    }
  }

  return (
    <>
      <div className="dashboard-content">
        <div className="container-fluid">
          <TokenGrid
            title="NFT Marketplace"
            action="purchased"
            isLoadingList={isLoadingList}
            loadingError={loadingError}
            nfts={nfts}
            isMarketPlace={true}
            buyNft={buyNFT}
          />
        </div>
      </div>
    </>
  );
}

export default MarketPlace;
