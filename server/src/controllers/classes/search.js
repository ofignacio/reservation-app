import {isError, error, makeQuery, success} from '../../utils/connections';

const search = async (req, res) => {
  const {idClass} = req.body;
  try {
    if (!idClass) {
      throw new Error('La clase no existe');
    }
    const classBooks = await makeQuery(
      'select u.username as username, u.name as name, u.phone as phone, u.email as email, b.created as created from books b inner join users u on b.idUsername = u.username where b.idClass = ?',
      [idClass],
    );

    res.send(
      success(
        classBooks,
        isError(false),
        `| Fetch books ${
          classBooks.length
        } of classes success | (src/controllers/classes/search.js/search) |`,
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Fetch books of classes failed | (src/controllers/classes/search.js/search/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default search;
