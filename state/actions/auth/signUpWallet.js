import { getError } from '../../../helper/getError';
import frontChannelService from '../../../service/frontChannelService';
import * as authActionType from '../../constants/auth';

export const connectWalletAction = async (requestData, dispatch) => {
  try {
    dispatch({ type: authActionType.USER_WALLET_CONNECT_START });

    var connectRequest = {
      identifier: requestData.email,
      identifierType: 'EMAIL',
    };

    const { data } = await frontChannelService()
      .signUp()
      .walletConnect(connectRequest, requestData.tokenValue);

    if (data.inError) {
      dispatch({
        type: authActionType.USER_WALLET_CONNECT_FAIL,
        payload: getError(data),
      });
    } else {
      dispatch({
        type: authActionType.USER_WALLET_CONNECT_SUCCESS,
        payload: data.globalId,
      });
      return data;
    }
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.USER_WALLET_CONNECT_FAIL,
      payload: err.toString(),
    });
  }
};

export const validateWalletAction = async (requestData, dispatch) => {
  try {
    dispatch({ type: authActionType.USER_WALLET_VALIDATE_START });

    var validateRequest = {
      globalId: requestData.verificationGlobalId,
      code: requestData.code,
    };

    const { data } = await frontChannelService()
      .signUp()
      .walletValidate(validateRequest, requestData.tokenValue);

    if (data.inError) {
      dispatch({
        type: authActionType.USER_WALLET_VALIDATE_FAIL,
        payload: getError(data),
      });
    } else {
      dispatch({
        type: authActionType.USER_WALLET_VALIDATE_SUCCESS,
        payload: data.tokenWrapper,
      });
    }

    return data;
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: authActionType.USER_WALLET_VALIDATE_FAIL,
      payload: err.toString(),
    });
  }
};
