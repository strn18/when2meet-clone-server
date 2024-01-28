import Vote from '../entity/vote.entity';
import VoteRepository from '../repository/vote.repository';
import { InternalServerError } from '../util/customErrors';

export default class VoteService {
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
