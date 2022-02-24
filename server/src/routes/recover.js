// Principal libarires
import {Router} from 'express';

// Controllers
import verify from '../controllers/recover/verify';

const PATH = '/recover';
const router = Router();

router.post(`${PATH}/verify`, verify);

export default router;
