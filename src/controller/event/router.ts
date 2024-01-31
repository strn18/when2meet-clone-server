import { Router } from 'express';
import { saveEvent, getTotalVotes } from './controller';

const eventRouter = Router();

eventRouter.post('/', saveEvent);
eventRouter.get('/:url', getTotalVotes);

export default eventRouter;
