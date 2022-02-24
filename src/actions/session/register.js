// Middleware
import {register} from '../../middleware/session';

// Reducers
import actions from '../../reducers/account/actions';

// Extras
import {validateError} from '../../utils/error';

const registerAction = (params, navigation) => async dispatch => {
  dispatch(actions.createAccountRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await register(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.createAccountSuccess(data));
      navigation.reset({
        index: 0,
        routes: [{name: 'VerifyRoute'}],
      });
    }
  } catch (err) {
    dispatch(actions.createAccountFailure(validateError(err)));
  }
};

export default registerAction;
