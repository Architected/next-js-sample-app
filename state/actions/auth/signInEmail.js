import { getError } from '../../../helper/getError';
import * as authActionType from '../../constants/auth';
import { deleteFromStore } from '../../../helper/storeHelper';
import frontChannelService from '../../../service/frontChannelService';
import CryptoHelper from '../../../service/cryptoHelper';
import startAuthorize from '../../../helper/authorizeHelper';

export const signInAction = async (
  email,
  password,
  clientDetails,
  dispatch
) => {
  try {
    dispatch({ type: authActionType.USER_SIGNIN_START });

    const cryptoHelper = new CryptoHelper();
    const codeVerifier = await cryptoHelper.generateCodeVerifier();
    const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

    if (!authorizeResponse || authorizeResponse.data.inError) {
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: 'An unexpected error has occurred',
      });
      return authorizeResponse.data;
    }

    var frontChannel = frontChannelService();
    const { data } = await frontChannel
      .signIn()
      .signInWithEmailAndPassword(
        email,
        password,
        authorizeResponse.data.authorizationCode,
        codeVerifier
      );

    if (data.inError) {
      dispatch({
        type: authActionType.USER_SIGNIN_FAIL,
        payload: getError(data),
      });
    } else {
      dispatch({
        type: authActionType.USER_SIGNIN_SUCCESS,
        payload: data.tokenWrapper,
      });
    }

    return data;
  } catch (err) {
    console.log(err);
    dispatch({
      type: authActionType.USER_SIGNIN_FAIL,
      payload: 'Unexpected error has occurred',
    });
  }
};

export const signOutAction = async (dispatch) => {
  await deleteFromStore('__tokenWrapper');
  dispatch({ type: authActionType.USER_SIGNIN_CLEAR });
};
