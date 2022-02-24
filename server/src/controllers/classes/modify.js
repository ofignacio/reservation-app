import {isError, error, makeQuery, success} from '../../utils/connections';
import {createQuery} from '../../utils/object';

const modify = async (req, res) => {
  const {id, date, quota, type, area, name} = req.body;
  try {
    if (!id || !date || !quota || !area) {
      throw new Error('Los campos no son validos');
    }

    const validations = ['date', 'quota', 'area', 'type', 'name'];
    const {result, array} = createQuery(req.body, validations);
    const {affectedRows} = await makeQuery(
      `update classes set ${result} where id = ?`,
      [...array, id],
    );

    if (affectedRows === 0) {
      throw new Error('Se ha producido un error');
    }

    res.send(
      success(
        null,
        isError(false),
        '| Modify class success | (src/controllers/classes/create.js/create) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Modify class failed | (src/controllers/classes/create.js/create/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default modify;
