// Principal libarires
import {Router} from 'express';

// Controllers
import register from '../controllers/account/register';

const PATH = '/account';
const router = Router();

router.post(`${PATH}/register`, register);

export default router;
