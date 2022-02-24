// Middleware
import {drop} from '../../middleware/book';

// Reducers
import actions from '../../reducers/book/actions';

// Extras
import {validateError} from '../../utils/error';

const deleteAction = (params, navigation) => async dispatch => {
  dispatch(actions.deleteRequest());
  try {
    const {
      error: {isError, message},
    } = await drop(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.deleteSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'Notifications'}],
      });
    }
  } catch (err) {
    dispatch(actions.deleteFailure(validateError(err)));
  }
};

export default deleteAction;
