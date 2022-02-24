import mysql from 'mysql';
import {isError, error, makeQuery, success} from '../../utils/connections';
import {GLOBAL_DATABASE} from '../../config/constants';

const removeClass = async (req, res) => {
  const {id} = req.body;
  try {
    if (!id) {
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
          'delete from notifications where idClass = ?',
          [id],
          connection,
        );

        await makeQuery(
          'delete from books where idClass = ?',
          [id],
          connection,
        );

        await makeQuery('delete from classes where id = ?', [id], connection);
        connection.commit();
        res.send(
          success(
            null,
            isError(false),
            '| Delete class success | (src/controllers/delete/drop.js/reserve) |',
          ),
        );
      } catch (ex) {
        connection.rollback();
        res.send(
          error(
            ex,
            `| Delete class failed | (src/controllers/book/delete.js/drop/catch) | BODY: ${JSON.stringify(
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

export default removeClass;
