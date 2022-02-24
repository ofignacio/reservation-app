// Middleware
import {createMasive} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const createAction = (params, navigation) => async (dispatch, getState) => {
  dispatch(actions.createClassesRequest());
  try {
    const {
      error: {isError, message},
    } = await createMasive(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.createMasiveClassesSuccess());
      navigation.reset({
        index: 0,
        routes: [{name: 'Admin'}],
      });
    }
  } catch (err) {
    dispatch(actions.createClassesFailure(validateError(err)));
  }
};

export default createAction;
