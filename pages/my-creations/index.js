import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import TokenGrid from '../../components/file/tokenGrid';
import { getCreatedItems } from '../../helper/contractHelper';
import { hasValidToken } from '../../helper/storageHelper';
import { walletService } from '../../service/walletServices.js';
import * as authActionType from 'architected-client/constants/iam.js';
import * as fileActionType from 'architected-client/constants/file.js';

function MyCreations() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { authState, bearerToken } = state['auth'];
  const { isLoadingList, loadingError } = state['file'];
  const [nfts, setNfts] = useState([]);
  const [accountChangedHandler, setAccountChangedHandler] = useState(false);
  const [chainChangedHandler, setChainChangedHandler] = useState(false);

  const getTokens = async () => {
    try {
      dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });

      if (window.ethereum) {
        if (!chainChangedHandler) {
          window.ethereum.on('chainChanged', handleChainChanged);
          setChainChangedHandler(true);
        }

        if (!accountChangedHandler) {
          window.ethereum.on('accountsChanged', handleAccountChanged);
          setAccountChangedHandler(true);
        }
      }

      const currentChain = await walletService.validateChain(dispatch);

      if (!currentChain.success) {
        dispatch({
          type: fileActionType.FILELIST_FETCH_FAIL,
          payload: currentChain.reason,
        });
        return;
      }

      const items = await getCreatedItems();

      dispatch({ type: fileActionType.FILELIST_FETCH_SUCCESS, payload: [] });

      return items;
    } catch (err) {
      console.log(err);
      dispatch({
        type: fileActionType.FILELIST_FETCH_FAIL,
        payload: 'An error has occured',
      });
    }
  };

  useEffect(() => {
    let isMounted = true;
    dispatch({ type: authActionType.INIT_MARKETPLACE_LAYOUT });
    const validToken = hasValidToken(authState, bearerToken, dispatch);
    if (!validToken) {
      router.push('/');
    } else {
      getTokens().then((items) => {
        if (isMounted) setNfts(items);
      });
    }

    return () => {
      isMounted = false;
    };
  }, []);

  function handleChainChanged() {
    window.location.reload();
  }

  function handleAccountChanged() {
    router.push('/signout');
  }
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
