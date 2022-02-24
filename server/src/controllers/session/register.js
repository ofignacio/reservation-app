import {isError, error, makeQuery, success} from '../../utils/connections';
import {DB_KEY} from '../../config/constants';
import {randomString} from '../../utils/string';
import mail from '../../utils/mail';
import {getHtmlRegisterMail} from '../../templates/emails';

const register = async (req, res) => {
  const {
    username,
    name,
    email,
    password,
    repeatPassword,
    phone,
    type,
  } = req.body;
  try {
    if (
      username.length < 4 ||
      password.length < 4 ||
      name.length === 0 ||
      email.length < 4 ||
      repeatPassword.length < 4 ||
      phone.length !== 9
    ) {
      throw new Error('Los campos están incompletos');
    }

    if (password !== repeatPassword) {
      throw new Error('Las contraseñas no coinciden');
    }

    const code = randomString(5);

    const {affectedRows: affectedRegisterRows} = await makeQuery(
      `insert into users(username, password, name, email, code, phone, type) values(?, AES_ENCRYPT(?, '${DB_KEY}'), ?, ?, ?, ?, ?)`,
      [username, password, name, email, code, phone, type],
    );
    if (affectedRegisterRows === 0) {
      throw new Error('Se ha producido un error, intente nuevamente');
    }

    // mail({
    //   to: email,
    //   subject: 'Registro exitoso',
    //   text: `Hola ${name}, muchas gracias por registrarte, el código de verificación es: ${code}`,
    //   html: getHtmlRegisterMail({name, code}),
    // });

    res.send(
      success(
        {username, name, email, phone, verified: 1, active: 1, admin: 0},
        isError(false),
        '| Register success | (src/controllers/session/register.js/register) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Register failed | (src/controllers/session/register.js/register/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default register;
