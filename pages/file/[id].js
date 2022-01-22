import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import { architectedConfig } from '../../architectedConfig';
import { fileClient } from '../../service/defaultServices.js';
import FileView from '../../components/file/fileView';
import { urlConstants } from '../../helper/urlConstants';
import { hasCompleteToken } from '../../helper/storageHelper';
import { getSigner } from '../../helper/walletHelper';
import { createMetaData } from '../../helper/ipfsHelper';
import {
  createNFT,
  convertToEther,
  addNFTToMarket,
} from '../../helper/contractHelper';
function FileDetail({ params }) {
  const fileId = params.id;

  // Declare router
  const router = useRouter();

  // Declare context and state container
  const { state, dispatch } = useContext(Store);

  const { authState, bearerToken } = state['auth'];
  const {
    isLoadingItem,
    loadingError,
    file,
    isUpdatingFile,
    updatingError,
    isDeletingFile,
    deletingError,
  } = state['file'];

  const retrieveData = async () => {
    await fileClient.getFile(fileId, dispatch, bearerToken.tokenValue);
  };

  useEffect(() => {
    if (authState == null || bearerToken == null) {
      return router.push('/');
    } else {
      if (!hasCompleteToken(authState, bearerToken, dispatch)) {
        console.log('hasCompleteToken failed');
        router.push(urlConstants.get('SIGNOUT'));
      }

      retrieveData();
    }
  }, []);

  const deleteFileHandler = async () => {
    await fileClient.deleteFile(
      file.globalId,
      dispatch,
      bearerToken.tokenValue
    );
    return router.push(urlConstants.get('PAGE_FILE_LIST'));
  };

  const updateFileHandler = async (data) => {
    var fileUpdateRequest = {
      globalId: fileId,
      name: data.name,
      description: data.description,
    };

    await fileClient.updateFile(
      fileUpdateRequest,
      dispatch,
      bearerToken.tokenValue
    );

    router.push(urlConstants.get('PAGE_FILE_LIST'));
  };

  const uploadToIPFS = async () => {
    await fileClient.uploadFileToIPFS(fileId, dispatch, bearerToken.tokenValue);
    await retrieveData();
  };

  const previewTokenHandler = async (price) => {
    var fileUpdateRequest = {
      globalId: file.globalId,
      tokenPrice: price,
    };

    await fileClient.updateNFT(
      fileUpdateRequest,
      dispatch,
      bearerToken.tokenValue
    );
    await retrieveData();
  };

  const mintToken = async (file) => {
    try {
      var signer = await getSigner();

      if (signer != null) {
        console.log('signer loaded');
        const url = await createMetaData(file);
        console.log('createMetaData returns: ' + url);

        const tokenId = await createNFT(url, signer);
        console.log('nft token created with tokenid:' + tokenId);

        const etherPrice = convertToEther(file.tokenPrice.toString());
        console.log('etherPrice for nft token created :' + etherPrice);

        await addNFTToMarket(signer, tokenId, etherPrice);
        console.log('nft token added to market:' + tokenId);
      } else {
        console.log('please install metamask');
      }
    } catch (error) {
      console.log('Error in mintToken: ', error);
    }
  };

  async function mintTokenHandler() {
    console.log('file:' + JSON.stringify(file));
    await mintToken(file);
    return router.push('/my-creations');
  }

  return (
    <FileView
      siteMode={architectedConfig.siteMode}
      isLoadingItem={isLoadingItem}
      loadingError={loadingError}
      updateFile={updateFileHandler}
      file={file}
      isUpdatingFile={isUpdatingFile}
      updatingError={updatingError}
      deleteFile={deleteFileHandler}
      isDeletingFile={isDeletingFile}
      deletingError={deletingError}
      uploadToIPFS={uploadToIPFS}
      previewTokenHandler={previewTokenHandler}
      mintTokenHandler={mintTokenHandler}
    />
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default FileDetail;
