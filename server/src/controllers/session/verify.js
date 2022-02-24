import jwt from 'jsonwebtoken';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {SESSION_KEY} from '../../config/constants';

const verify = async (req, res) => {
  const {username, code} = req.body;
  try {
    if (username.length < 4 || !code) {
      throw new Error('Los campos están incompleto');
    }

    const {0: account} = await makeQuery(
      'select code from users where username = ? and code = ?',
      [username, code],
    );
    if (!account || account.code !== code) {
      throw new Error(
        'El código es incorrecto, verifique que este bien escrito o intente iniciando sesión en un rato',
      );
    }

    const {affectedRows: affectedUpdateRows} = await makeQuery(
      'update users set verified = 1 where username = ?',
      [username],
    );

    if (affectedUpdateRows === 0) {
      throw new Error('Se ha producido un error');
    }

    const token = jwt.sign({username}, SESSION_KEY, {
      expiresIn: '365 days',
      algorithm: 'HS256',
    });

    res.send(
      success(
        token,
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
