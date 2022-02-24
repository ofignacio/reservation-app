import mysql from 'mysql';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {GLOBAL_DATABASE} from '../../config/constants';
import {
  DBDateToLetterUy,
  DBDateToTimeJs,
  diff_minutes,
  nowLocale,
  DBDateToJs,
} from '../../utils/date';

const drop = async (req, res) => {
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

        const {affectedRows: affectedNotificationsRows} = await makeQuery(
          'delete from notifications where idClass = ? and idUsername = ?',
          [idClass, idUser],
          connection,
        );

        if (affectedNotificationsRows === 0) {
          throw new Error(
            'Se ha producido un error, vuelva a intentarlo en un rato',
          );
        }

        const {affectedRows: affectedReserveRows} = await makeQuery(
          'delete from books where idUsername = ? and idClass = ?',
          [idUser, idClass],
          connection,
        );
        if (affectedReserveRows === 0) {
          throw new Error(
            'Se ha producido un error, vuelva a intentarlo en un rato',
          );
        }

        const {
          0: {date},
        } = await makeQuery(
          'select date from classes where id = ?',
          [idClass],
          connection,
        );

        const classDate = new Date(date);

        const nowDate = new Date();

        if (
          nowDate.getTime() >= classDate.getTime() ||
          diff_minutes(classDate, nowDate) <= 30
        ) {
          throw new Error(
            'No se pudo dar de baja, debe de hacerlo al menos 30 minutos antes de la clase',
          );
        }

        const {affectedRows: affectedNotiRows} = await makeQuery(
          'insert into notifications(title, description, type, idUsername) values(?, ?, ?, ?)',
          [
            `Clase ${DBDateToJs(date)}`,
            `Se desagendo el ${DBDateToLetterUy(
              nowDate,
            )} a las ${DBDateToTimeJs(nowDate)}`,
            'CLASS',
            idUser,
          ],
          connection,
        );
        if (affectedNotiRows === 0) {
          throw new Error('Se ha producido un error');
        }
        connection.commit();
        res.send(
          success(
            null,
            isError(false),
            `| Delete ${idClass} book success | (src/controllers/delete/drop.js/reserve) |`,
          ),
        );
      } catch (ex) {
        connection.rollback();
        res.send(
          error(
            ex,
            `| Delete book failed | (src/controllers/book/delete.js/drop/catch) | BODY: ${JSON.stringify(
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
        `| Delete book failed | (src/controllers/book/delete.js/drop/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default drop;
