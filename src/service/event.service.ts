import Event from '../entity/event.entity';
import EventRepository from '../repository/event.repository';
import CreateEventInput from '../type/event/create.input';
import { InternalServerError } from '../util/customErrors';

export default class EventService {
  static async saveEvent(createEventInput: CreateEventInput): Promise<Event> {
    try {
      const eventEntity = await EventRepository.create(createEventInput);

      return await EventRepository.save(eventEntity);
    } catch (error) {
      throw new InternalServerError('이벤트 저장을 실패했습니다.');
    }
  }

  static createRandomString(length: number): string {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456879';

    let result = '';

    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }

    return result;
  }

  static async getEventByUrl(url: string): Promise<Event | null> {
    try {
      return await EventRepository.findOne({
        where: { url },
        relations: { users: { votes: { timePiece: true } } },
      });
    } catch (error) {
      throw new InternalServerError('해당 url의 이벤트 검색을 실패했습니다.');
    }
  }
}
