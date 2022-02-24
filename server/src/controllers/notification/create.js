import {isError, error, makeQuery, success} from '../../utils/connections';

const create = async (req, res) => {
  const {title, description, type, username} = req.body;
  try {
    if (!title || !description) {
      throw new Error('El título y/o la descripción está vacía');
    }

    const {affectedRows: affectedNotificationsRows, insertId} = await makeQuery(
      'insert into notifications(title, description, type, idUsername) values(?, ?, ?, ?)',
      [title, description, type, username],
    );

    if (affectedNotificationsRows === 0) {
      throw new Error('Se ha producido un error');
    }

    res.send(
      success(
        null,
        isError(false),
        `| Create ${insertId} notification success | (src/controllers/notifications/create.js/create) |`,
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Create notification failed | (src/controllers/notifications/create.js/create/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default create;
