import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './event.entity';
import Vote from './vote.entity';
import { eventNames } from 'process';

@Entity()
export default class TimePiece {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'date',
    nullable: false,
    comment: 'date부터 date+15분',
  })
  date!: Date;

  @ManyToOne(() => Event, (event) => event.timePieces)
  event!: Event;

  @OneToMany(() => Vote, (vote) => vote.timePiece)
  votes!: Vote[]; // 어떤 timePiece가 몇 표를 받았는지, 누가 투표했는지 알기 위해 필요하다(timePiece에 마우스 오버 했을 때).
}
