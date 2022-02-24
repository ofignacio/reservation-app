import {isError, error, makeQuery, success} from '../../utils/connections';

const search = async (req, res) => {
  const {username} = req.body;
  try {
    const {0: user} = await makeQuery(
      'select username, name, email, active, verified, code, admin, created, phone from users where username = ? or email = ?',
      [username, username],
    );

    res.send(
      success(
        user,
        isError(false),
        '| Search user success | (src/controllers/users/search.js/search) |',
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Search user failed | (src/controllers/users/search.js/search/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default search;
