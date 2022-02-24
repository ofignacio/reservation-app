import jwt from 'jsonwebtoken';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {DB_KEY, SESSION_KEY} from '../../config/constants';

const verify = async (req, res) => {
  const {email, code, password} = req.body;
  try {
    if (email.length < 4 || !code) {
      throw new Error('Los campos están incompleto');
    }

    const {0: account} = await makeQuery(
      'select code from users where email = ? and code = ?',
      [email, code],
    );
    if (!account || account.code !== code) {
      throw new Error(
        'El código es incorrecto, verifique que este bien escrito o intente iniciando sesión en un rato',
      );
    }

    const {affectedRows: affectedUpdateRows} = await makeQuery(
      `update users set password = AES_ENCRYPT(?, '${DB_KEY}') where email = ?`,
      [password, email],
    );

    if (affectedUpdateRows === 0) {
      throw new Error('Se ha producido un error');
    }

    res.send(
      success(
        null,
        isError(false),
        '| Verify success | (src/controllers/session/verify.js/verify) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Verify failed | (src/controllers/session/verify.js/verify/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default verify;
