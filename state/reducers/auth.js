import * as authActionType from '../constants/auth';

export const initialAuthState = {
  authState: null,
  bearerToken: null,
  additionalData: null,
  callInProgress: false,
  warningMessage: null,
  errorMessage: null,
  isLoading: true,
  nextScreen: null,
  marketPlace: false,
  loggedIn: false,
  chainId: null,
  accountId: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case authActionType.INIT_MARKETPLACE_LAYOUT:
      return {
        ...state,
        marketPlace: true,
        callInProgress: false,
      };
    case authActionType.INIT_DEFAULT_LAYOUT:
      return {
        ...state,
        marketPlace: false,
        callInProgress: false,
      };
    case authActionType.USER_SIGNIN_START:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        callInProgress: true,
        additionalData: null,
        warningMessage: null,
        errorMessage: null,
        marketPlace: false,
        isLoading: true,
        loggedIn: false,
      };
    case authActionType.USER_SIGNIN_SUCCESS:
      return {
        ...state,
        authState: action.payload ? action.payload.authState : null,
        bearerToken: action.payload ? action.payload.bearerToken : null,
        additionalData: action.payload ? action.payload.additionalData : null,
        callInProgress: false,
        isLoading: false,
        loggedIn: action.payload
          ? action.payload.authState != null &&
            action.payload.authState.signinScope == 'COMPLETE'
          : false,
      };
    case authActionType.USER_SIGNIN_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
        isLoading: false,
        loggedIn: false,
      };
    case authActionType.USER_SIGNIN_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
        isLoading: false,
        loggedIn: false,
      };
    case authActionType.USER_SIGNIN_CLEAR:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        additionalData: null,
        isLoading: false,
        loggedIn: false,
      };
    case authActionType.USER_SIGNIN_RESTORE:
      return {
        ...state,
        authState: action.payload ? action.payload.authState : null,
        bearerToken: action.payload ? action.payload.bearerToken : null,
        additionalData: action.payload ? action.payload.additionalData : null,
        callInProgress: false,
        isLoading: false,
        loggedIn: action.payload
          ? action.payload.authState != null &&
            action.payload.authState.signinScope == 'COMPLETE'
          : false,
      };
    case authActionType.USER_SIGNIN_NEXTSCREEN:
      return {
        ...state,
        nextScreen: action.payload,
      };
    case authActionType.USER_SIGNUP_START:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
        marketPlace: false,
      };
    case authActionType.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        authState: action.payload.authState,
        bearerToken: action.payload.bearerToken,
        callInProgress: false,
      };
    case authActionType.USER_SIGNUP_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.USER_SIGNUP_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.USER_SIGNUP_VALIDATE_START:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
        marketPlace: false,
      };
    case authActionType.USER_SIGNUP_VALIDATE_SUCCESS:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        callInProgress: false,
      };
    case authActionType.USER_SIGNUP_VALIDATE_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.USER_SIGNUP_VALIDATE_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_START:
      return {
        ...state,
        authState: null,
        bearerToken: null,
        callInProgress: true,
        additionalData: null,
        warningMessage: null,
        errorMessage: null,
      };
    case authActionType.PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        authState: action.payload ? action.payload.authState : null,
        bearerToken: action.payload ? action.payload.bearerToken : null,
        additionalData: action.payload ? action.payload.additionalData : null,
        callInProgress: false,
      };
    case authActionType.PASSWORD_RESET_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_VALIDATE_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
      };
    case authActionType.PASSWORD_RESET_VALIDATE_SUCCESS:
      return {
        ...state,
        authState: action.payload ? action.payload.authState : null,
        bearerToken: action.payload ? action.payload.bearerToken : null,
        additionalData: action.payload ? action.payload.additionalData : null,
        callInProgress: false,
      };
    case authActionType.PASSWORD_RESET_VALIDATE_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_VALIDATE_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_PERFORM_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
      };
    case authActionType.PASSWORD_RESET_PERFORM_SUCCESS:
      return {
        ...state,
        callInProgress: false,
      };
    case authActionType.PASSWORD_RESET_PERFORM_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_PERFORM_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_CHANGE_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
      };
    case authActionType.PASSWORD_RESET_CHANGE_SUCCESS:
      return {
        ...state,
        callInProgress: false,
      };
    case authActionType.PASSWORD_RESET_CHANGE_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.PASSWORD_RESET_CHANGE_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.METAMASK_SET_CHAIN:
      return {
        ...state,
        chainId: action.payload,
      };
    case authActionType.METAMASK_SET_ACCOUNT:
      return {
        ...state,
        accountAddress: action.payload,
      };
    case authActionType.METAMASK_CLEAR_ACCOUNT:
      return {
        ...state,
        accountAddress: '',
      };
    case authActionType.METAMASK_ERROR_ACCOUNT:
      return {
        ...state,
        isLoading: false,
        callInProgress: false,
        chainId: null,
        accountAddress: null,
        errorMessage: action.payload,
      };
    case authActionType.USER_WALLET_CONNECT_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
        verifierGlobalId: '',
      };
    case authActionType.USER_WALLET_CONNECT_SUCCESS:
      return {
        ...state,
        verificationGlobalId: action.payload,
        callInProgress: false,
      };
    case authActionType.USER_WALLET_CONNECT_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.USER_WALLET_CONNECT_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.USER_WALLET_VALIDATE_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
        marketPlace: false,
      };
    case authActionType.USER_WALLET_VALIDATE_SUCCESS:
      return {
        ...state,
        authState: action.payload.authState,
        bearerToken: action.payload.bearerToken,
        callInProgress: false,
      };
    case authActionType.USER_WALLET_VALIDATE_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.USER_WALLET_VALIDATE_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };
    case authActionType.PASSWORD_CHANGE_START:
      return {
        ...state,
        callInProgress: true,
        warningMessage: null,
        errorMessage: null,
      };
    case authActionType.PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        callInProgress: false,
      };
    case authActionType.PASSWORD_CHANGE_WARNING:
      return {
        ...state,
        callInProgress: false,
        warningMessage: action.payload,
      };
    case authActionType.PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        callInProgress: false,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
