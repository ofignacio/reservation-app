// Middleware
import {verify} from '../../middleware/session';

// Reducers
import actions from '../../reducers/account/actions';

// Extras
import {validateError} from '../../utils/error';

const verifyAction = params => async dispatch => {
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
      dispatch(
        actions.modifyAccountSuccess({
          verified: 1,
        }),
      );
    }
  } catch (err) {
    dispatch(actions.verifyAccountFailure(validateError(err)));
  }
};

export default verifyAction;
