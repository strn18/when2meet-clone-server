import { Router } from 'express';
import { getUserVotes, getUserById, saveUserVotes } from './controller';

const userRouter = Router();

userRouter.get('/:url', getUserVotes);
userRouter.post('/:url', saveUserVotes);

userRouter.get('/', getUserById);
// query를 사용하여 id에 맞는 user 정보를 가져오는 api ex) GET http://localhost:3000/user?id=1
// userRouter.get('/:age', getUsersByAge); // param을 사용하여 age에 맞는 user들 정보를 가져오는 api ex) GET http://localhost:3000/user/23
// userRouter.post('/', createUser); // body를 사용하여 user 정보를 저장하는 api ex) POST http://localhost:3000/user | body: { "firstName": "John", "lastName": "Doe", "age": 23 }

export default userRouter;
