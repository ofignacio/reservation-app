// Middleware
import {pass} from '../../middleware/users';

// Reducers
import actions from '../../reducers/users/actions';

// Extras
import {validateError} from '../../utils/error';

const passAction = (params, Alert) => async (dispatch, getState) => {
  dispatch(actions.modifyUsersRequest());
  try {
    const {
      error: {isError, message},
    } = await pass(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.modifyUsersSuccess({}));
      Alert.alert('Se restableció la contraseña correctamente');
    }
  } catch (err) {
    dispatch(actions.modifyUsersFailure(validateError(err)));
  }
};

export default passAction;
