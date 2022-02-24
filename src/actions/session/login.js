// Middleware
import {enter} from '../../middleware/session';

// Reducers
import actions from '../../reducers/account/actions';

// Extras
import {validateError} from '../../utils/error';

const login = params => async (dispatch, getState) => {
  dispatch(actions.saveAccountRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await enter(params);
    if (isError) {
      dispatch(actions.saveAccountFailure(message));
    } else {
      dispatch(actions.saveAccountSuccess(data));
    }
  } catch (err) {
    dispatch(actions.saveAccountFailure(validateError(err)));
  }
};

export default login;
