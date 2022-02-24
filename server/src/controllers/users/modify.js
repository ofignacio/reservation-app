import {isError, error, makeQuery, success} from '../../utils/connections';
import {createQuery} from '../../utils/object';

const modify = async (req, res) => {
  const {username} = req.body;
  try {
    const validations = [
      'verified',
      'admin',
      'active',
      'name',
      'email',
      'phone',
    ];
    const {result, array} = createQuery(req.body, validations);
    const {affectedRows} = await makeQuery(
      `update users set ${result} where username = ? or email = ?`,
      [...array, username, username],
    );

    if (affectedRows === 0) {
      throw new Error('Se ha producido un error');
    }

    res.send(
      success(
        null,
        isError(false),
        '| Modify user success | (src/controllers/users/modify.js/modify) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Modify user failed | (src/controllers/users/modify.js/modify/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default modify;
