import * as authActionType from '../state/constants/auth';

const saveToStore = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const getFromStore = (key) => {
  try {
    return localStorage.getItem(key) != null
      ? JSON.parse(localStorage.getItem(key))
      : null;
  } catch (e) {
    console.log(e);
  }
};

const deleteFromStore = (key) => {
  try {
    return localStorage.removeItem(key);
  } catch (e) {
    console.log(e);
  }
};

const hasValidToken = (authState, bearerToken, dispatch) => {
  try {
    let tokenFromStore;
    if (!authState) {
      tokenFromStore = getFromStore('_tokenWrapper');

      if (!tokenFromStore) return false;

      authState = tokenFromStore.authState;
      bearerToken = tokenFromStore.bearerToken;
    }

    const tokenExpiry = Date.parse(bearerToken.tokenExpiryUTC);
    const currentDate = Date.now();

    console.log('authstate:tokenExpiry:' + tokenExpiry);
    console.log('authstate:currentDate:' + currentDate);

    if (tokenExpiry < currentDate || authState.signinScope !== 'COMPLETE') {
      deleteFromStore('_tokenWrapper');
      dispatch({
        type: authActionType.USER_SIGNIN_RESTORE,
        payload: null,
      });
      return false;
    }

    if (tokenFromStore) {
      dispatch({
        type: authActionType.USER_SIGNIN_RESTORE,
        payload: tokenFromStore,
      });
    }

    return true;
  } catch (e) {
    console.log(e);
  }
};

const hasCompleteToken = (authState, bearerToken) => {
  try {
    if (!authState || !bearerToken) {
      return false;
    }

    const tokenExpiry = Date.parse(bearerToken.tokenExpiryUTC);
    const currentDate = Date.now();

    if (tokenExpiry < currentDate || authState.signinScope !== 'COMPLETE') {
      return false;
    }

    return true;
  } catch (e) {
    console.log(e);
  }
};

export {
  getFromStore,
  saveToStore,
  deleteFromStore,
  hasValidToken,
  hasCompleteToken,
};
