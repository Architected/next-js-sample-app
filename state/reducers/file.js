import * as fileActionType from '../constants/file';

export const initialFileState = {
  isLoading: false,
  warningMessage: null,
  errorMessage: null,
  isLoadingList: false,
  isLoadingItem: true,
  loadingError: null,
  isSavingFile: false,
  saveFileError: null,
  isDeletingFile: false,
  deletingError: null,
  isUpdatingFile: false,
  updatingError: null,
  files: [],
  file: {},
  fileCount: 0,
  displayModal: false,
  modalTitle: null,
};

export const fileReducer = (state = initialFileState, action) => {
  switch (action.type) {
    case fileActionType.FILELIST_FETCH_REQUEST:
      return {
        ...state,
        isLoadingList: true,
        loadingError: null,
        files: [],
        file: {},
        fileCount: 0,
      };
    case fileActionType.FILELIST_FETCH_SUCCESS:
      return {
        ...state,
        isLoadingList: false,
        files: action.payload,
        fileCount: action.payload.length,
        loadingError: null,
      };
    case fileActionType.FILELIST_FETCH_FAIL:
      return { ...state, isLoadingList: false, loadingError: action.payload };
    case fileActionType.FILE_FETCH_REQUEST:
      return {
        ...state,
        isLoadingItem: true,
        loadingError: null,
        files: [],
        file: {},
        fileCount: 0,
      };
    case fileActionType.FILE_FETCH_SUCCESS:
      return {
        ...state,
        isLoadingItem: false,
        file: action.payload.file,
        updateFile: action.payload.updateFile,
        deleteFile: action.payload.deleteFile,
        loadingError: null,
      };
    case fileActionType.FILE_FETCH_FAIL:
      return { ...state, isLoadingItem: false, loadingError: action.payload };
    case fileActionType.FILE_CREATE_START:
      return {
        ...state,
        displayModal: false,
        isSavingFile: false,
        saveFileError: null,
      };
    case fileActionType.FILE_CREATE_REQUEST:
      return { ...state, isSavingFile: true, saveFileError: null };
    case fileActionType.FILE_CREATE_SUCCESS:
      return {
        ...state,
        displayModal: false,
        isSavingFile: false,
        saveFileError: null,
      };
    case fileActionType.FILE_CREATE_FAIL:
      return { ...state, isSavingFile: false, saveFileError: action.payload };
    case fileActionType.FILE_UPDATE_REQUEST:
      return { ...state, isUpdatingFile: true, updatingError: null };
    case fileActionType.FILE_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdatingFile: false,
        updatingError: null,
      };
    case fileActionType.FILE_UPDATE_FAIL:
      return { ...state, isUpdatingFile: false, updatingError: action.payload };
    case fileActionType.FILE_DELETE_REQUEST:
      return { ...state, isDeletingFile: true, deletingError: null };
    case fileActionType.FILE_DELETE_SUCCESS:
      return { ...state, isDeletingFile: false, deletingError: null };
    case fileActionType.FILE_DELETE_FAIL:
      return { ...state, isDeletingFile: false, deletingError: action.payload };
    case fileActionType.SHOW_MODAL:
      return { ...state, displayModal: true, modalTitle: action.payload };
    case fileActionType.HIDE_MODAL:
      return { ...state, displayModal: false, modalTitle: null };

    default:
      return state;
  }
};
