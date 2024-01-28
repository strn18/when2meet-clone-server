import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './user.entity';
import TimePiece from './timePiece.entity';

@Entity()
export default class Event {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  eventName!: string;

  @Column()
  url!: string;

  @OneToMany(() => User, (user) => user.event)
  users!: User[]; // 투표에 참여한 유저가 총 누구누구 있는지 알기 위해 필요하다(timePiece에 마우스 오버 했을 때).

  @OneToMany(() => TimePiece, (timePiece) => timePiece.event)
  timePieces!: TimePiece[]; // 현재 이벤트의 모든 timePiece들을 찾기 위해 필요하다.
}
