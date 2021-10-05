import * as globalActionType from '../constants/global';

export const initialGlobalState = {
  callInProgress: false,
  isLoadingItem: true,
  loadingError: null,
  isUpdatingItem: false,
  updatingError: null,
  marketPlace: false,
};

export const globalReducer = (state, action) => {
  switch (action.type) {
    case globalActionType.ITEM_FETCH_REQUEST:
      return { ...state, isLoadingItem: true, loadingError: null };
    case globalActionType.ITEM_FETCH_SUCCESS:
      return {
        ...state,
        isLoadingItem: false,
        loadingError: null,
        isUpdatingItem: false,
        updatingError: null,
      };
    case globalActionType.ITEM_FETCH_FAIL:
      return { ...state, isLoadingItem: false, loadingError: action.payload };

    case globalActionType.ITEM_UPDATE_REQUEST:
      return { ...state, isUpdatingItem: true, updatingError: null };
    case globalActionType.ITEM_UPDATE_SUCCESS:
      return {
        ...state,
        isUpdatingItem: false,
        updatingError: null,
      };
    case globalActionType.ITEM_UPDATE_FAIL:
      return { ...state, isUpdatingItem: false, updatingError: action.payload };

    default:
      return state;
  }
};
