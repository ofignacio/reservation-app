// Principal libarires
import {Router} from 'express';
import middleware, {admin} from '../utils/middleware';

// Controllers
import get from '../controllers/notification/get';
import create from '../controllers/notification/create';

const PATH = '/notification';
const router = Router();

router.post(`${PATH}/get`, middleware, get);

router.post(`${PATH}/create`, admin, create);

export default router;
