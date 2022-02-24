import {isError, error, makeQuery, success} from '../../utils/connections';

const create = async (req, res) => {
  const {date, quota, type, area, name} = req.body;
  try {
    if (!date || !quota || !area) {
      throw new Error('Los campos no son validos');
    }

    const {affectedRows: affectedClassesRows, insertId} = await makeQuery(
      'insert into classes(date, quota, type, area, name) values(?, ?, ? ,?, ?)',
      [date, quota, type.length ? type : null, area, name.length ? name : null],
    );

    if (affectedClassesRows === 0) {
      throw new Error('Se ha producido un error');
    }

    let result = {};
    Object.assign(result, req.body, {id: insertId});

    res.send(
      success(
        result,
        isError(false),
        `| Create ${insertId} class success | (src/controllers/classes/create.js/create) |`,
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Create class failed | (src/controllers/classes/create.js/create/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default create;
