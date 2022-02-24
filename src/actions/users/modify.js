// Middleware
import {modify} from '../../middleware/users';

// Reducers
import actions from '../../reducers/users/actions';

// Extras
import {validateError} from '../../utils/error';

const modifyAction = (params, Alert) => async (dispatch, getState) => {
  dispatch(actions.modifyUsersRequest());
  try {
    const {
      error: {isError, message},
    } = await modify(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.modifyUsersSuccess(params));
      if (Alert) {
        Alert.alert('Se modificó el usuario correctamente');
      }
    }
  } catch (err) {
    dispatch(actions.modifyUsersFailure(validateError(err)));
  }
};

export default modifyAction;
