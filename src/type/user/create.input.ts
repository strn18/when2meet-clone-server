import Event from '../../entity/event.entity';

export default interface CreateUserInput {
  userName: string;
  password?: string;
  event: Event;
}
