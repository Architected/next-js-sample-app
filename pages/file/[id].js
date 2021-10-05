import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Store } from '../../state/storeProvider';
import {
  getFileAction,
  deleteFileAction,
  updateFileAction,
} from '../../state/actions/file';

// import FileViewMain from '../../components/files/FileViewMain';
// import FileViewIPFS from '../../components/files/FileViewIPFS';
// import FileViewToken from '../../components/files/FileViewToken';

// import {
//   uploadFileToIPFS,
//   updateNFT,
//   mintToken,
// } from '../../state/actions/file-nft';
import { architectedConfig } from '../../architectedConfig';
import FileView from '../../components/file/fileView';
import { PAGE_FILE_LIST } from '../../helper/routeHelper';

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
    await getFileAction(fileId, dispatch, bearerToken.tokenValue);
  };

  useEffect(() => {
    if (authState == null || bearerToken == null) {
      return router.push('/');
    } else {
      console.log('caling retrieveData');
      retrieveData();
    }
  }, []);

  const deleteFileHandler = async () => {
    await deleteFileAction(file.globalId, dispatch, bearerToken.tokenValue);
    return router.push(PAGE_FILE_LIST);
  };

  const updateFileHandler = async (data) => {
    var fileUpdateRequest = {
      globalId: fileId,
      name: data.name,
      description: data.description,
    };
    console.log('fileUpdateRequest', JSON.stringify(fileUpdateRequest));
    await updateFileAction(fileUpdateRequest, dispatch, bearerToken.tokenValue);

    router.push(PAGE_FILE_LIST);
  };

  // const uploadToIPFS = async () => {
  //   await uploadFileToIPFS(fileId, dispatch, bearerToken.tokenValue);
  //   await retrieveData();
  // };

  // const previewTokenHandler = async (price) => {
  //   var fileUpdateRequest = {
  //     globalId: fileId,
  //     tokenPrice: price,
  //   };

  //   await updateNFT(fileUpdateRequest, dispatch, bearerToken.tokenValue);
  //   await retrieveData();
  // };

  // async function mintTokenHandler() {
  //   await mintToken(file);
  //   return router.push('/my-creations');
  // }

  return (
    <FileView
      siteMode={architectedConfig.siteMode}
      isLoadingItem={isLoadingItem}
      loadingError={loadingError}
      updateFile={updateFileHandler}
      file={file}
      isUpdatingItem={isUpdatingFile}
      updatingError={updatingError}
      deleteFile={deleteFileHandler}
      isDeletingFile={isDeletingFile}
      deletingError={deletingError}
    />
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: { params },
  };
}

export default FileDetail;
