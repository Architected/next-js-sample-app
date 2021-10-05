import { getError } from '../../../helper/getError.js';
import frontChannelService from '../../../service/frontChannelService';
import * as globalActionType from '../../constants/global';

export const getProfileAction = async (dispatch, tokenValue) => {
  try {
    dispatch({ type: globalActionType.ITEM_FETCH_REQUEST });

    var frontChannel = frontChannelService();
    const { data } = await frontChannel.profile().getProfile(tokenValue);

    if (data.InError) {
      dispatch({
        type: globalActionType.ITEM_FETCH_FAIL,
        payload: getError(data),
      });
      return;
    }

    dispatch({ type: globalActionType.ITEM_FETCH_SUCCESS });

    return data;
  } catch (err) {
    dispatch({
      type: globalActionType.ITEM_FETCH_FAIL,
      payload: 'An error has occured retrieving the profile',
    });
  }
};

export const saveProfileAction = async (requestData, dispatch, tokenValue) => {
  try {
    dispatch({ type: globalActionType.ITEM_UPDATE_REQUEST });

    var frontChannel = frontChannelService();
    if (requestData.globalId) {
      console.log('calling updateProfile');

      const { data } = await frontChannel
        .profile()
        .updateProfile(requestData.globalId, requestData, tokenValue);
    } else {
      console.log('calling saveProfile');
      await frontChannel.profile().saveProfile(requestData, tokenValue);
    }

    console.log('Profile update success');
    dispatch({
      type: globalActionType.ITEM_UPDATE_SUCCESS,
    });
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: globalActionType.ITEM_UPDATE_FAIL,
      payload: err.toString(),
    });
  }
};

export const changePasswordAction = async (
  newPassword,
  confirmPassword,
  dispatch,
  tokenValue
) => {
  try {
    dispatch({ type: globalActionType.PASSWORD_CHANGE_START });
    var validateRequest = {
      password: newPassword,
      confirmpassword: confirmPassword,
    };

    console.log('calling password reset perform');

    var frontChannel = frontChannelService();
    const { data } = await frontChannel
      .profile()
      .perform(validateRequest, tokenValue);

    if (data.inError) {
      dispatch({
        type: globalActionType.PASSWORD_CHANGE_FAIL,
        payload: getError(data),
      });
    } else {
      console.log('password reset success');
      dispatch({
        type: globalActionType.PASSWORD_CHANGE_SUCCESS,
        payload: null,
      });

      return data;
    }
  } catch (err) {
    console.log(err.toString());
    dispatch({
      type: globalActionType.PASSWORD_CHANGE_FAIL,
      payload: 'Unable to perform password reset',
    });
  }
};
