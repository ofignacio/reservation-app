// Middleware
import {modify} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const modifyAction = (params, navigation) => async (dispatch, getState) => {
  dispatch(actions.modifyClassRequest());
  try {
    const {
      error: {isError, message},
    } = await modify(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.modifyClassSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'Admin'}],
      });
    }
  } catch (err) {
    dispatch(actions.modifyClassFailure(validateError(err)));
  }
};

export default modifyAction;
