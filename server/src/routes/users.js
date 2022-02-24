// Principal libarires
import {Router} from 'express';
import {admin} from '../utils/middleware';

// Controllers
import modify from '../controllers/users/modify';
import search from '../controllers/users/search';
import pass from '../controllers/users/pass';

const PATH = '/users';
const router = Router();

router.post(`${PATH}/search`, admin, search);

router.post(`${PATH}/modify`, admin, modify);

router.post(`${PATH}/modify/pass`, admin, pass);

export default router;
