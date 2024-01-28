import { Router } from 'express';
import userRouter from './user/router';
import eventRouter from './event/router';

const router = Router();

router.use('/user', userRouter);
router.use('/event', eventRouter);

export default router;
