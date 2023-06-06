import { Router } from 'express';
import { getProxy, home, login, postProxy } from './controller'

const router = Router();

router.get('/', home);
router.get('/login', login);

router.get('/*', getProxy);
router.post('/*', postProxy);

export default router;
