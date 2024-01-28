import { Router } from 'express';
import { saveEvent } from './controller';

const eventRouter = Router();

eventRouter.post('/', saveEvent);

export default eventRouter;
