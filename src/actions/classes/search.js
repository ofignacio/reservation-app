// Middleware
import {search} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const searchAction = params => async (dispatch, getState) => {
  dispatch(actions.searchClassesRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await search(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.searchClassesSuccess(data));
    }
  } catch (err) {
    dispatch(actions.searchClassesFailure(validateError(err)));
  }
};

export default searchAction;
