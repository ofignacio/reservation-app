// Principal libarires
import {Router} from 'express';
import middleware, {admin} from '../utils/middleware';

// Controllers
import get from '../controllers/classes/get';
import create from '../controllers/classes/create';
import modify from '../controllers/classes/modify';
import createMasive from '../controllers/classes/createMasive';
import search from '../controllers/classes/search';
import remove from '../controllers/classes/remove';
import removeClass from '../controllers/classes/removeClass';

const PATH = '/classes';
const router = Router();

router.post(`${PATH}/get`, middleware, get);

router.post(`${PATH}/create`, admin, create);

router.post(`${PATH}/modify`, admin, modify);

router.post(`${PATH}/removeClass`, admin, removeClass);

router.post(`${PATH}/create/masive`, admin, createMasive);

router.post(`${PATH}/search`, admin, search);

router.post(`${PATH}/remove`, admin, remove);

export default router;
