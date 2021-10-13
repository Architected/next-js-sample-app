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
    if (!authState) {
      const tokenFromStore = getFromStore('_tokenWrapper');
      console.log('tokenFromStore:' + JSON.stringify(tokenFromStore));

      if (!tokenFromStore) return false;

      const tokenExpiry = Date.parse(tokenFromStore.bearerToken.tokenExpiryUTC);
      const currentDate = Date.now();

      console.log('tokenFromStore:tokenExpiry:' + tokenExpiry);
      console.log('tokenFromStore:currentDate:' + currentDate);

      if (tokenExpiry > currentDate) {
        console.log('tokenFromStore:has valid token');
        dispatch({
          type: authActionType.USER_SIGNIN_RESTORE,
          payload: tokenFromStore,
        });
        return true;
      } else {
        console.log('tokenFromStore:token expired');
        deleteFromStore('_tokenWrapper');
        dispatch({
          type: authActionType.USER_SIGNIN_RESTORE,
          payload: null,
        });
        return false;
      }
    } else {
      if (authState.signinScope !== 'COMPLETE') return false;

      if (authState.signinScope === 'COMPLETE') {
        const tokenExpiry = Date.parse(bearerToken.tokenExpiryUTC);
        const currentDate = Date.now();

        console.log('authstate:tokenExpiry:' + tokenExpiry);
        console.log('authstate:currentDate:' + currentDate);

        if (tokenExpiry <= currentDate) {
          console.log('authstate:token expired');
          deleteFromStore('__tokenWrapper');
          dispatch({
            type: authActionType.USER_SIGNIN_RESTORE,
            payload: null,
          });

          return false;
        }

        return true;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

export { getFromStore, saveToStore, deleteFromStore, hasValidToken };
