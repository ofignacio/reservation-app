// Middleware
import {get} from '../../middleware/users';

// Reducers
import actions from '../../reducers/users/actions';

// Extras
import {validateError} from '../../utils/error';

const getAction = params => async (dispatch, getState) => {
  dispatch(actions.getUsersRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await get(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.getUsersSuccess(data));
    }
  } catch (err) {
    dispatch(actions.getUsersFailure(validateError(err)));
  }
};

export default getAction;
