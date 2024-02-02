import { RequestHandler } from 'express';
import UserService from '../../service/user.service';
import EventService from '../../service/event.service';
import VoteService from '../../service/vote.service';
import CreateUserInput from '../../type/user/create.input';
import { BadRequestError } from '../../util/customErrors';
import TimePieceService from '../../service/timePiece.service';
import CreateVoteInput from '../../type/vote/create.input';

// 예시 controller입니다. 필요에 따라 수정하거나 삭제하셔도 됩니다.

// GET /user/:url
export const getUserVotes: RequestHandler = async (req, res, next) => {
  try {
    const { url } = req.params;
    const { userName, password } = req.body;

    const event = await EventService.getEventByUrl(url);
    if (!event) throw new BadRequestError('해당하는 이벤트가 없습니다.');

    const curUser = event.users.find((user) => user.userName == userName);
    if (!curUser) {
      const createUserInput: CreateUserInput = { userName, password, event };
      await UserService.saveUser(createUserInput);
      res.json([]);
    } else if (curUser.password == password) {
      const votes = curUser.votes.map((vote) => vote.timePiece.id);
      res.json(votes);
    } else {
      throw new BadRequestError('비밀번호가 일치하지 않습니다.');
    }
  } catch (error) {
    next(error);
  }
};

// POST /user/:url
export const saveUserVotes: RequestHandler = async (req, res, next) => {
  try {
    const { userId, votes } = req.body as { userId: number; votes: number[] };

    const user = await UserService.getUserById(userId);
    if (!user) throw new BadRequestError('해당 유저를 찾을 수 없습니다.');

    await VoteService.deleteVotesByUserId(userId); // 현재 유저의 투표 정보 모두 삭제

    votes.forEach(async (vote) => {
      const timePiece = await TimePieceService.getTimePieceById(vote);
      if (!timePiece)
        throw new BadRequestError('TimePiece를 찾을 수 없습니다.');

      const createVoteInput: CreateVoteInput = { user, timePiece };
      await VoteService.saveVote(createVoteInput); // 방금 투표한 정보를 새로 저장
    });

    res.status(201).json(votes);
  } catch (error) {
    next(error);
  }
};

// 여기부터 임시
export const getUserById: RequestHandler = async (req, res, next) => {
  try {
    const id = Number(req.query.id);

    const user = await UserService.getUserById(id);
    if (!user) throw new BadRequestError('해당하는 유저가 없습니다.');

    res.json(user);
  } catch (error) {
    next(error);
  }
};

// export const getUsersByAge: RequestHandler = async (req, res, next) => {
//   try {
//     const age = Number(req.params.age);

//     const users = await UserService.getUsersByAge(age);

//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     const { firstName, lastName, age } = req.body as CreateUserInput;
//     const createUserInput: CreateUserInput = { firstName, lastName, age };

//     const user = await UserService.saveUser(createUserInput);

//     res.status(201).json(user.id);
//   } catch (error) {
//     next(error);
//   }
// };
