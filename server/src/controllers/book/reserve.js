import mysql from 'mysql';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {GLOBAL_DATABASE} from '../../config/constants';
import {DBDateToLetterUy, DBDateToTimeJs} from '../../utils/date';

const reserve = async (req, res) => {
  const {idUser} = req;
  const {idClass} = req.body;
  try {
    if (!idClass) {
      throw new Error('La clase no existe');
    }
    const connection = mysql.createConnection(GLOBAL_DATABASE);
    connection.connect(err => {
      if (err) throw new Error('server.internalerror');
    });

    connection.beginTransaction(async err => {
      try {
        if (err) throw new Error(err);

        const {
          0: {quota, quantity},
        } = await makeQuery(
          'select c.quota as quota, count(b.id) as quantity from classes c left join books b on c.id = b.idClass where c.id = ?',
          [idClass],
          connection,
        );

        if (quantity >= quota) {
          throw new Error('No hay mas cupos');
        }

        const {0: book} = await makeQuery(
          'select id from books where idUsername = ? and idClass = ?',
          [idUser, idClass],
        );
        if (book) {
          throw new Error('Ya reservó esta clase');
        }

        const {affectedRows: affectedReserveRows} = await makeQuery(
          'insert into books(idUsername, idClass) values(?, ?)',
          [idUser, idClass],
          connection,
        );
        if (affectedReserveRows === 0) {
          throw new Error('Se ha producido un error');
        }

        const {
          0: {date, area, type},
        } = await makeQuery(
          'select date, area, type from classes where id = ?',
          [idClass],
          connection,
        );

        const {affectedRows: affectedNotificationRows} = await makeQuery(
          'insert into notifications(date, title, description, type, idUsername, idClass) values(?, ?, ?, ?, ?, ?)',
          [
            date,
            'Recordatorio',
            `Recuerda que tienes una clase en ${area.toLowerCase()} el ${DBDateToLetterUy(
              date,
            )} a las ${DBDateToTimeJs(date)} ${
              type ? `de ${type.toLowerCase()}` : ''
            }`,
            'CLASS',
            idUser,
            idClass,
          ],
          connection,
        );
        if (affectedNotificationRows === 0) {
          throw new Error('Se ha producido un error');
        }
        connection.commit();
        res.send(
          success(
            null,
            isError(false),
            `| Reserve ${idClass} class success | (src/controllers/book/reserve.js/reserve) |`,
          ),
        );
      } catch (ex) {
        connection.rollback();
        res.send(
          error(
            ex,
            `| Reserve class failed | (src/controllers/book/reserve.js/reserve/catch) | BODY: ${JSON.stringify(
              req.body,
            )} |`,
          ),
        );
      } finally {
        connection.end();
      }
    });
  } catch (err) {
    res.send(
      error(
        err,
        `| Reserve class failed | (src/controllers/book/reserve.js/reserve/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default reserve;
