import TimePiece from '../entity/timePiece.entity';
import TimePieceRepository from '../repository/timePiece.repository';
import CreateTimePieceInput from '../type/timePiece/create.input';
import { InternalServerError } from '../util/customErrors';

export default class TimePieceService {
  static async saveTimePiece(
    createTimePieceInput: CreateTimePieceInput,
  ): Promise<TimePiece> {
    try {
      const timePieceEntity =
        await TimePieceRepository.create(createTimePieceInput);

      return await TimePieceRepository.save(timePieceEntity);
    } catch (error) {
      throw new InternalServerError('TimePiece 저장을 실패했습니다.');
    }
  }
}
