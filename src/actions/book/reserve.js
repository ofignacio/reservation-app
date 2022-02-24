// Principal libraries
import {CommonActions} from '@react-navigation/native';

// Middleware
import {reserve} from '../../middleware/book';

// Reducers
import actions from '../../reducers/book/actions';

// Extras
import {validateError} from '../../utils/error';

const reserveAction = (params, navigation) => async dispatch => {
  dispatch(actions.reserveRequest());
  try {
    const {
      error: {isError, message},
    } = await reserve(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.reserveSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'Success'}],
      });
    }
  } catch (err) {
    dispatch(actions.reserveFailure(validateError(err)));
  }
};

export default reserveAction;
