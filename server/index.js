// Principal libraries
import express from 'express';
import cors from 'cors';
import {GLOBAL_PORT, API_ROUTE} from './src/config/constants';

// Routes
import session from './src/routes/session';
import classes from './src/routes/classes';
import book from './src/routes/book';
import notification from './src/routes/notification';
import users from './src/routes/users';
import recover from './src/routes/recover';

// Extras
import {log} from './src/utils/logs';

// Initialice express
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

// Register requests
app.use((req, res, next) => {
  let ip = req.headers['X-Forwarded-For'];
  if (ip) ip = ip.split(',', 2)[0];
  log(`${req.method} ${req.path} / ${ip}`);
  next();
});

// Routes
app.use(API_ROUTE, session);
app.use(API_ROUTE, classes);
app.use(API_ROUTE, book);
app.use(API_ROUTE, notification);
app.use(API_ROUTE, users);
app.use(API_ROUTE, recover);
app.get(`${API_ROUTE}/check`, (req, res) => res.send('Connection successfull'));

// App listen
app.listen(GLOBAL_PORT, () => {
  console.log(`Bethel starts on ${GLOBAL_PORT} \n`);
});
