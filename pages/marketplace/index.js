import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import TokenGrid from '../../components/file/tokenGrid';
import { getSigner } from '../../helper/walletHelper';
import { purchaseToken } from '../../helper/contractHelper';
import { ethers } from 'ethers';
import * as fileActionType from '../../state/constants/file';
import * as authActionType from '../../state/constants/auth';
import { architectedConfig } from '../../architectedConfig';

function MyTokens() {
  const router = useRouter();

  const { state, dispatch } = useContext(Store);
  const { isLoadingList, loadingError } = state['file'];
  const [nfts, setNfts] = useState([]);

  async function loadNFTs() {
    try {
      dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });

      //const web3Modal = new Web3Modal();
      //const connection = await web3Modal.connect();
      //console.log(connection);
      //const provider = new ethers.providers.Web3Provider(connection);
      //const signer = provider.getSigner();

      // const marketContract = new ethers.Contract(
      //   architectedConfig.marketAddress,
      //   Market.abi,
      //   signer
      // );

      const provider = new ethers.providers.JsonRpcProvider(
        architectedConfig.chainUrl
      );
      // const signer = provider.getSigner();

      // const marketContract = getMarketContract(signer);
      // const tokenContract = getTokenContract(provider);
      // const data = await marketContract.fetchMarketItems();

      // const items = await Promise.all(
      //   data.map(async (i) => {
      //     console.log('token: ' + JSON.stringify(i));
      //     return mapToken(tokenContract, i);
      //   })
      // );
      // setNfts(items);
      dispatch({ type: fileActionType.FILELIST_FETCH_SUCCESS, payload: [] });
    } catch (err) {
      console.log(err);
      dispatch({
        type: fileActionType.FILELIST_FETCH_FAIL,
        payload: 'An error has occured',
      });
    }
  }

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

  useEffect(() => {
    dispatch({ type: authActionType.INIT_MARKETPLACE_LAYOUT });
    loadNFTs();
  }, []);

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

export default MyTokens;
