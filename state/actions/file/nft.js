import { downloadAssetAction, downloadThumbnailAction } from './index';

import {
  uploadInterPlanetaryFile,
  getInterPlanetaryFileUrl,
  createMetaData,
} from '../../../helper/ipfsHelper';

import { getSigner } from '../../../helper/walletHelper';

import {
  createNFT,
  convertToEther,
  addNFTToMarket,
} from '../../../helper/contractHelper';
import frontChannelService from '../../../service/frontChannelService';
import * as fileActionType from '../../constants/file';

export const uploadFileToIPFS = async (fileId, dispatch, token) => {
  try {
    dispatch({ type: fileActionType.FILE_UPDATE_REQUEST });
    var assetResponse = await downloadAssetAction(fileId, token);

    if (!assetResponse.data) {
      console.log('assetResponse is null');
      return;
    } else {
      console.log('assetResponse downloaded');
    }

    var thumbnailResponse = await downloadThumbnailAction(fileId, token);

    if (!thumbnailResponse.data) {
      console.log('thumbnailResponse is null');
      return;
    } else {
      console.log('thumbnailResponse downloaded');
    }

    const assetUploadResponse = await uploadInterPlanetaryFile(
      assetResponse.data
    );
    if (!assetUploadResponse) {
      console.log('metaDataResponse is null');
      return;
    }
    console.log('metaDataResponse:' + JSON.stringify(assetUploadResponse));
    var assetUrl = getInterPlanetaryFileUrl(assetUploadResponse.path);
    console.log(assetUrl);

    const thumbnailUploadResponse = await uploadInterPlanetaryFile(
      thumbnailResponse.data
    );
    if (!thumbnailUploadResponse) {
      console.log('metaDataResponse is null');
      return;
    }
    console.log('metaDataResponse:' + JSON.stringify(thumbnailUploadResponse));
    var thumbnailUrl = getInterPlanetaryFileUrl(thumbnailUploadResponse.path);
    console.log(thumbnailUrl);

    // generate a code verifier
    var fileUpdateRequest = {
      globalId: fileId,
      ipfsAssetUrl: assetUrl,
      ipfsThumbnailUrl: thumbnailUrl,
    };
    // call login
    console.log('calling update ipfs record');

    var frontChannel = frontChannelService();
    await frontChannel.file().updateIPFS(fileId, fileUpdateRequest, token);

    console.log('file update ipfs success');

    dispatch({ type: fileActionType.FILE_UPDATE_SUCCESS });
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_UPDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const updateNFT = async (requestData, dispatch, token) => {
  try {
    dispatch({ type: fileActionType.FILE_UPDATE_REQUEST });

    console.log('calling update nft');

    var frontChannel = frontChannelService();
    await frontChannel
      .file()
      .updateNFT(requestData.globalId, requestData, token);

    console.log('nft update success');

    dispatch({ type: fileActionType.FILE_UPDATE_SUCCESS });
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_UPDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const mintToken = async (file) => {
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
