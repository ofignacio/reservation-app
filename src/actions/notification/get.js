// Middleware
import {get} from '../../middleware/notification';

// Reducers
import actions from '../../reducers/notification/actions';

// Extras
import {validateError} from '../../utils/error';

const getAction = params => async dispatch => {
  dispatch(actions.notificationRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await get(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.notificationSuccess(data));
    }
  } catch (err) {
    dispatch(actions.notificationFailure(validateError(err)));
  }
};

export default getAction;
