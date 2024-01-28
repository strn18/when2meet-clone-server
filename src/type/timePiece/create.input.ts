import Event from '../../entity/event.entity';

export default interface CreateTimePieceInput {
  date: Date;
  event: Event;
}
