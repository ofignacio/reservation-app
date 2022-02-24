// Principal libarires
import {Router} from 'express';

// Controllers
import login from '../controllers/session/login';
import register from '../controllers/session/register';
import verify from '../controllers/session/verify';
import resend from '../controllers/session/resend';

const PATH = '/session';
const router = Router();

router.post(`${PATH}/login`, login);
router.post(`${PATH}/register`, register);
router.post(`${PATH}/verify`, verify);
router.post(`${PATH}/resend`, resend);

export default router;
