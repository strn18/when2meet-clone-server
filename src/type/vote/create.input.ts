import User from '../../entity/user.entity';
import TimePiece from '../../entity/timePiece.entity';

export default interface CreateVoteInput {
  user: User;
  timePiece: TimePiece;
}
