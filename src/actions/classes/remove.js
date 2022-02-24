// Middleware
import {remove} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const removeAction = params => async (dispatch, getState) => {
  dispatch(actions.removeClassesRequest());
  try {
    const {
      error: {isError, message},
    } = await remove(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.removeClassesSuccess(params));
    }
  } catch (err) {
    dispatch(actions.removeClassesFailure(validateError(err)));
  }
};

export default removeAction;
