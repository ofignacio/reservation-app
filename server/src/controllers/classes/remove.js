import mysql from 'mysql';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {GLOBAL_DATABASE} from '../../config/constants';

const drop = async (req, res) => {
  const {idClass, idUser} = req.body;
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

        await makeQuery(
          'delete from notifications where idClass = ? and idUsername = ?',
          [idClass, idUser],
          connection,
        );

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
