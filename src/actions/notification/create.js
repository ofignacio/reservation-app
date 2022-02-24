// Middleware
import {create} from '../../middleware/notification';

// Reducers
import actions from '../../reducers/notification/actions';

// Extras
import {validateError} from '../../utils/error';

const createAction = (params, navigation) => async dispatch => {
  dispatch(actions.sendNotificationRequest());
  try {
    const {
      error: {isError, message},
    } = await create(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.sendNotificationSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'Admin'}],
      });
    }
  } catch (err) {
    dispatch(actions.sendNotificationFailure(validateError(err)));
  }
};

export default createAction;
