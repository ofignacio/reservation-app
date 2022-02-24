// Middleware
import {verify} from '../../middleware/recover';

// Reducers
import actions from '../../reducers/account/actions';

// Extras
import {validateError} from '../../utils/error';

const verifyAction = (params, navigation) => async dispatch => {
  dispatch(actions.verifyAccountRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await verify(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.verifyAccountSuccess(data));
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  } catch (err) {
    dispatch(actions.verifyAccountFailure(validateError(err)));
  }
};

export default verifyAction;
