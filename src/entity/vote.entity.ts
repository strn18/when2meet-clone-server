import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import TimePiece from './timePiece.entity';

@Entity()
export default class Vote {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.votes)
  user!: User;

  @ManyToOne(() => TimePiece, (timePiece) => timePiece.votes)
  timePiece!: TimePiece;
}
