// Middleware
import {resend} from '../../middleware/session';

// Reducers
import actions from '../../reducers/account/actions';

// Extras
import {validateError} from '../../utils/error';

const resendAction = params => async dispatch => {
  dispatch(actions.resendAccountRequest());
  try {
    const {
      data,
      error: {isError, message},
    } = await resend(params);
    if (isError) {
      throw new Error(message);
    } else {
      dispatch(actions.resendAccountSuccess(data));
    }
  } catch (err) {
    dispatch(actions.resendAccountFailure(validateError(err)));
  }
};

export default resendAction;
