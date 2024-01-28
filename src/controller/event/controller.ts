import { RequestHandler } from 'express';
import EventService from '../../service/event.service';
import TimePieceService from '../../service/timePiece.service';
import CreateEventInput from '../../type/event/create.input';
import CreateTimePieceInput from '../../type/timePiece/create.input';

// POST /event
export const saveEvent: RequestHandler = async (req, res, next) => {
  try {
    const { dates, begin, end, eventName } = req.body as {
      dates: Date[];
      begin: number;
      end: number;
      eventName: string;
    };

    const url = EventService.createRandomString(5); // ***이미 있는 url인지 중복 검사 해야 함.***
    const createEventInput: CreateEventInput = { eventName, url };
    const event = await EventService.saveEvent(createEventInput);

    dates.forEach((date) => {
      let curDate = new Date(date);
      curDate.setHours(begin, 0, 0); // begin시 00분 00초로 맞춰둔다.

      while (curDate.getHours() < end) {
        const newDate = new Date(curDate); // 깊은 복사
        const createTimePieceInput: CreateTimePieceInput = {
          date: newDate,
          event,
        };
        TimePieceService.saveTimePiece(createTimePieceInput);
        curDate.setMinutes(curDate.getMinutes() + 15);
      }
    });

    res.status(201).json(event);
  } catch (error) {
    next(error);
  }
};
