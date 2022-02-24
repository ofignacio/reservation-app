import {isError, error, makeQuery, success} from '../../utils/connections';

const get = async (req, res) => {
  const {neighborhood, start} = req.body;
  try {
    let classes;

    if (!start) {
      classes = await makeQuery(
        'select c.id, c.date, c.quota, c.type, c.area, c.name, count(b.id) as quantity from classes c left join books b on c.id = b.idClass where c.area = ? and c.date >= now() and c.date < now() + INTERVAL 6 DAY group by c.id order by c.date',
        [neighborhood],
      );
    } else {
      classes = await makeQuery(
        'select c.id, c.date, c.quota, c.type, c.area, c.name, count(b.id) as quantity from classes c left join books b on c.id = b.idClass where DATE(c.date) = DATE(?) group by c.id order by c.date',
        [start],
      );
    }

    const {
      0: {date},
    } = await makeQuery('select now() as date');

    res.send(
      success(
        {classes, date},
        isError(false),
        `| Fetch ${
          classes.length
        } classes success | (src/controllers/classes/get.js/get) |`,
      ),
    );
  } catch (err) {
    res.send(
      error(
        err,
        `| Fetch classes failed | (src/controllers/classes/get.js/get/catch) | BODY: ${JSON.stringify(
          req.body,
        )} |`,
      ),
    );
  }
};

export default get;
