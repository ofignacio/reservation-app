// Middleware
import {create} from '../../middleware/classes';

// Reducers
import actions from '../../reducers/classes/actions';

// Extras
import {validateError} from '../../utils/error';

const createAction = (params, navigation) => async (dispatch, getState) => {
  dispatch(actions.createClassesRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await create(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.createClassesSuccess(data));
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
