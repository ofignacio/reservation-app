import mysql from 'mysql';
import {COMPLETE_DAYS_BD, GLOBAL_DATABASE} from '../../config/constants';
import {isError, error, makeQuery, success} from '../../utils/connections';

const createMasive = async (req, res) => {
  try {
    const connection = mysql.createConnection(GLOBAL_DATABASE);
    connection.connect(err => {
      if (err) throw new Error('server.internalerror');
    });

    connection.beginTransaction(async function(err) {
      try {
        if (err) throw new Error(err);

        const primaries = await makeQuery(
          'select id, day, time, name, area, type, quota from `primary`',
          connection,
        );

        const {
          0: {init},
        } = await makeQuery(
          'SELECT curdate() + INTERVAL 7 - weekday(curdate()) DAY as init',
          connection,
        );

        primaries.forEach(async primary => {
          const days = COMPLETE_DAYS_BD.indexOf(primary.day);
          const time = primary.time.split(':');
          let date = new Date(init.replace(/-/g, '/'));
          date.setDate(date.getDate() + days);
          date.setHours(time[0]);
          date.setMinutes(time[1]);
          await makeQuery(
            'insert into classes(date, quota, type, area, name) values(?, ?, ? ,?, ?)',
            [
              date,
              primary.quota,
              primary.type && primary.type.length ? primary.type : null,
              primary.area,
              primary.name && primary.name.length ? primary.name : null,
            ],
            connection,
          );
        });
        connection.commit();
        res.send(
          success(
            null,
            isError(false),
            '| Create masive classes success | (src/controllers/classes/createMasive.js/createMasive) |',
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
        `| Create masive classes failed | (src/controllers/classes/createMasive.js/createMasive/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default createMasive;
