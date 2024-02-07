import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Event from './event.entity';
import Vote from './vote.entity';

@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    name: 'user_name',
    type: 'varchar',
    length: 50,
    nullable: false,
    default: 'user',
    comment: '사용자 이름',
  })
  userName!: string;

  @Column({
    name: 'password',
    type: 'varchar',
    length: 512,
    nullable: false,
    comment: '사용자 비밀번호',
  })
  password!: string; // 비밀번호를 입력하지 않으면 공백("")

  @ManyToOne(() => Event, (event) => event.users)
  event!: Event;

  @OneToMany(() => Vote, (vote) => vote.user)
  votes!: Vote[]; // 유저가 어디어디에 투표했는지 알기 위해 필요하다(이전에 투표 후 다시 로그인 했을 때)
}
