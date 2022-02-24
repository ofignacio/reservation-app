import {isError, error, makeQuery, success} from '../../utils/connections';

const get = async (req, res) => {
  const {idUser} = req;
  try {
    const notifications = await makeQuery(
      'select id, date, title, description, type, idClass from notifications where (idUsername = ? or idUsername = ?) and date >= DATE_ADD(NOW(), INTERVAL -1 DAY) order by date desc',
      [idUser, '0000'],
    );

    res.send(
      success(
        notifications,
        isError(false),
        `| Fetch ${
          notifications.length
        } notifications success | (src/controllers/notifications/get.js/get) |`,
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Fetch notifications failed | (src/controllers/notifications/get.js/get/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default get;
