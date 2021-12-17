import { getError } from '../../../helper/getError.js';
import frontChannelService from '../../../service/frontChannelService';
import * as fileActionType from '../../constants/file';
import fileDownload from 'js-file-download';
import { architectedConfig } from '../../../architectedConfig';
import { contentTypeIcons } from '../../../helper/contentTypeIcons.js';

export const validateFileBasic = (fileSize, fileType, dispatch) => {
  const fileCategory = contentTypeIcons[fileType];

  if (fileSize > architectedConfig.maxFileSizeMB * 1000000) {
    dispatch({
      type: fileActionType.FILE_CREATE_FAIL,
      payload:
        'File is too big! Max Size:' + architectedConfig.maxFileSizeMB + ' MB',
    });
    return false;
  }

  if (fileCategory != 'file-image') {
    dispatch({
      type: fileActionType.FILE_CREATE_FAIL,
      payload: 'Only image file types are currently supported',
    });
    return false;
  }

  return true;
};
export const uploadFileAction = async (requestData, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_CREATE_REQUEST });

    if (requestData && requestData.file[0]) {
      const fileSize = requestData.file[0].size;
      const fileType = requestData.file[0].type;

      const validFile = validateFileBasic(fileSize, fileType, dispatch);

      if (!validFile) return;
    }

    var uploadRequest = {
      name: requestData.name ?? requestData.file[0].name,
      description: requestData.description,
    };

    const formData = new FormData();
    formData.append('item', JSON.stringify(uploadRequest));
    formData.append('file', requestData.file[0]);

    console.log(JSON.stringify());

    var frontChannel = frontChannelService();
    const { data } = await frontChannel.file().upload(formData, tokenValue);

    if (!data.inError) {
      dispatch({ type: fileActionType.FILE_CREATE_SUCCESS });
    } else {
      dispatch({
        type: fileActionType.FILE_CREATE_FAIL,
        payload: getError(data),
      });
    }

    return data;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_CREATE_FAIL,
      payload: 'An error has occured',
    });
  }
};

export const getAllFilesAction = async (dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILELIST_FETCH_REQUEST });
    console.log('before responseData.data.fileList');
    var frontChannel = frontChannelService();
    const { data } = await frontChannel.file().getAllFiles(tokenValue);

    dispatch({
      type: fileActionType.FILELIST_FETCH_SUCCESS,
      payload: data.fileList,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: fileActionType.FILELIST_FETCH_FAIL,
      payload: 'An error has occured',
    });
  }
};

export const getFileAction = async (fileId, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_FETCH_REQUEST });

    var frontChannel = frontChannelService();
    const { data } = await frontChannel.file().getFile(fileId, tokenValue);

    if (!data.InError) {
      dispatch({
        type: fileActionType.FILE_FETCH_SUCCESS,
        payload: {
          file: data.file,
        },
      });
    } else {
      dispatch({
        type: fileActionType.FILE_FETCH_FAIL,
        payload: 'An error has occured retrieving the file',
      });
    }

    return data;
  } catch (err) {
    dispatch({
      type: fileActionType.FILE_FETCH_FAIL,
      payload: 'An error has occured retrieving the file',
    });
  }
};

export const deleteFileAction = async (fileId, dispatch, tokenValue) => {
  console.log('Deleting fileGlobalId: ' + fileId);
  dispatch({ type: fileActionType.FILE_DELETE_REQUEST });

  try {
    var frontChannel = frontChannelService();
    await frontChannel.file().deleteFile(fileId, tokenValue);

    dispatch({ type: fileActionType.FILE_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: fileActionType.FILE_DELETE_FAIL,
      payload: 'An error has occured deleting the file',
    });
  }
};

export const updateFileAction = async (requestData, dispatch, tokenValue) => {
  try {
    dispatch({ type: fileActionType.FILE_UPDATE_REQUEST });

    console.log('calling update file record');

    var frontChannel = frontChannelService();
    await frontChannel
      .file()
      .updateFile(requestData.globalId, requestData, tokenValue);

    console.log('file update success');
    dispatch({
      type: fileActionType.FILE_UPDATE_SUCCESS,
    });
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: fileActionType.FILE_UPDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const downloadFileAction = async (
  fileGlobalId,
  fileName,
  tokenValue
) => {
  console.log('Downloading fileGlobalId: ' + fileGlobalId);
  var frontChannel = frontChannelService();
  const { data } = await frontChannel.file().download(fileGlobalId, tokenValue);
  return fileDownload(data, fileName);
};

export const downloadAssetAction = async (fileGlobalId, tokenValue) => {
  var frontChannel = frontChannelService();
  return await frontChannel.file().downloadAsset(fileGlobalId, tokenValue);
};

export const downloadThumbnailAction = async (fileGlobalId, tokenValue) => {
  var frontChannel = frontChannelService();
  return await frontChannel.file().downloadThumbnail(fileGlobalId, tokenValue);
};
