// Principal libarires
import {Router} from 'express';
import middleware from '../utils/middleware';

// Controllers
import reserve from '../controllers/book/reserve';

import drop from '../controllers/book/delete';

const PATH = '/book';
const router = Router();

router.post(`${PATH}/reserve`, middleware, reserve);

router.post(`${PATH}/delete`, middleware, drop);

export default router;
