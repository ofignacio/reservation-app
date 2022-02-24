import {isError, error, makeQuery, success} from '../../utils/connections';
import {randomString} from '../../utils/string';
import mail from '../../utils/mail';
import {getHtmlRegisterMail} from '../../templates/emails';

const resend = async (req, res) => {
  const {username: user} = req.body;
  try {
    if (user.length < 4) {
      throw new Error('El campo está incompleto');
    }

    const {
      0: {username, email, name},
    } = await makeQuery(
      'select username, email, name from users where username = ? or email = ?',
      [user, user],
    );

    if (!email) {
      throw new Error('La cuenta no existe, porfavor registrate nuevamente');
    }

    const code = randomString(5);

    const {affectedRows: affectedUpdateRows} = await makeQuery(
      'update users set code = ? where username = ?',
      [code, username],
    );
    if (affectedUpdateRows === 0) {
      throw new Error('Se ha producido un error, intente nuevamente');
    }

    mail({
      to: email,
      subject: 'Código Bethel',
      text: `Hola ${name}, el código de verificación es: ${code}`,
      html: getHtmlRegisterMail({name, code}),
    });

    res.send(
      success(
        null,
        isError(false),
        '| Resend success | (src/controllers/session/resend.js/resend) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Resend failed | (src/controllers/session/resend.js/resend/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default resend;
