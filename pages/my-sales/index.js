import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../../state/storeProvider';
import TokenGrid from '../../components/file/tokenGrid';
import { ethers } from 'ethers';
import * as fileActionType from '../../state/constants/file';
import * as authActionType from '../../state/constants/auth';
import {
  getTokenContract,
  getMarketContract,
  mapToken,
} from '../../helper/contractHelper';
import Web3Modal from 'web3modal';

function MySales() {
  const { state, dispatch } = useContext(Store);
  const { isLoadingList, loadingError } = state['file'];
  const [nfts, setNfts] = useState([]);

  async function loadNFTs() {
    try {
      dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });

      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();

      const marketContract = getMarketContract(signer);
      const tokenContract = getTokenContract(provider);
      const data = await marketContract.fetchItemsCreated();
      const soldItems = data.filter((i) => i.sold);
      const items = await Promise.all(
        soldItems.map(async (i) => {
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

  return (
    <>
      <div className="dashboard-content">
        <div className="container-fluid">
          <TokenGrid
            title="My Sales"
            action="sold"
            isLoadingList={isLoadingList}
            loadingError={loadingError}
            nfts={nfts}
          />
        </div>
      </div>
    </>
  );
}

export default MySales;
