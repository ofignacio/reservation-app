import {isError, error, makeQuery, success} from '../../utils/connections';
import jwt from 'jsonwebtoken';
import {DB_KEY, SESSION_KEY} from '../../config/constants';

const login = async (req, res) => {
  const {username, password} = req.body;
  try {
    if (username.length < 4 || password.length < 4) {
      throw new Error('El usuario y/o contraseña es incorrecto');
    }
    const {0: account} = await makeQuery(
      `select username, name, email, phone, active, admin, verified, type from users where email = ? and password = AES_ENCRYPT(?, '${DB_KEY}')`,
      [username, password],
    );
    if (account && !account.active) {
      throw new Error('El usuario esta bloqueado, contacte con Bethel');
    } else if (account) {
      let token;
      let data = {username: account.username};
      if (account.admin) Object.assign(data, {isAdmin: true});
      if (account.verified) {
        token = jwt.sign(data, SESSION_KEY, {
          expiresIn: '365 days',
          algorithm: 'HS256',
        });
      }
      res.send(
        success(
          {account, token},
          isError(false),
          `| Login ${username} Success | (src/controllers/session/login.js/login) |`,
        ),
      );
    } else {
      res.send(
        success(
          null,
          isError(true, 'El usuario y/o contraseña es incorrecto'),
          '| Login Invalid | (src/controllers/session/login.js/login) |',
        ),
      );
    }
  } catch (err) {
    res.send(
      error(
        err,
        `| Login failed | (src/controllers/session/login.js/login/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default login;
