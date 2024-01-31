import Vote from '../entity/vote.entity';
import VoteRepository from '../repository/vote.repository';
import { InternalServerError } from '../util/customErrors';

export default class VoteService {
  static async getVotesByUrl(url: string): Promise<Vote[] | null> {
    try {
      return await VoteRepository.find({
        where: { timePiece: { event: { url } } },
        relations: { user: true, timePiece: true },
        select: { user: { userName: true }, timePiece: { id: true } },
      });
    } catch (error) {
      throw new InternalServerError('해당 url의 모든 표 정보 불러오기 실패.');
    }
  }

  // 얘는 걍 임시임
  static async getVoteById(id: number): Promise<Vote | null> {
    try {
      return await VoteRepository.findOne({
        where: { id },
        relations: { user: { event: true } },
      });
    } catch (error) {
      throw new InternalServerError('표 정보를 불러오는데 실패했습니다.');
    }
  }

  // static async getUsersByAge(age: number): Promise<User[]> {
  //   try {
  //     return await UserRepository.find({ where: { age } });
  //   } catch (error) {
  //     throw new InternalServerError('유저 정보를 불러오는데 실패했습니다.');
  //   }
  // }

  // static async saveUser(createUserInput: CreateUserInput): Promise<User> {
  //   try {
  //     const userEntity = await UserRepository.create(createUserInput);
  //     return await UserRepository.save(userEntity);
  //   } catch (error) {
  //     throw new InternalServerError('유저 정보를 저장하는데 실패했습니다.');
  //   }
  // }
}
