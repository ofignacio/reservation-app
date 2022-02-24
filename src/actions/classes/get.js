// Middleware
import {get} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const getAction = params => async (dispatch, getState) => {
  dispatch(actions.saveClassesRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await get(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.saveClassesSuccess(data.classes, data.date));
    }
  } catch (err) {
    dispatch(actions.saveClassesFailure(validateError(err)));
  }
};

export default getAction;
