import { RequestHandler } from 'express';
import EventService from '../../service/event.service';
import TimePieceService from '../../service/timePiece.service';
import VoteService from '../../service/vote.service';
import CreateEventInput from '../../type/event/create.input';
import CreateTimePieceInput from '../../type/timePiece/create.input';
import TimePieceVoteResult from '../../type/timePiece/vote.result';
import { BadRequestError } from '../../util/customErrors';

// POST /event
export const saveEvent: RequestHandler = async (req, res, next) => {
  try {
    const { dates, begin, end, eventName } = req.body as {
      dates: Date[];
      begin: number;
      end: number;
      eventName: string;
    };

    let url = EventService.createRandomString(5);
    while (await EventService.getEventByUrl(url)) {
      url = EventService.createRandomString(5);
    }
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

// GET /event/:url
export const getTotalVotes: RequestHandler = async (req, res, next) => {
  try {
    const { url } = req.params;

    const event = await EventService.getEventByUrl(url);
    if (!event) throw new BadRequestError('해당하는 이벤트가 없습니다.');

    const totalVotes = await VoteService.getVotesByUrl(url); // url에 해당하는 이벤트의 모든 표 정보 가져오기

    const ret: {
      timePieceVotes: TimePieceVoteResult[];
      totalUserNames: string[];
    } = {
      timePieceVotes: [],
      totalUserNames: event.users.map((user) => user.userName), // 이벤트의 모든 참여자들의 이름
    };

    event.timePieces.forEach((timePiece) => {
      ret.timePieceVotes.push({ timePieceId: timePiece.id, userNames: [] });
    });

    if (totalVotes) {
      totalVotes.forEach((curVote) => {
        const target = ret.timePieceVotes.find(
          (timePieceVote) => timePieceVote.timePieceId == curVote.timePiece.id,
        );

        if (!target)
          throw new BadRequestError('투표한 timePiece가 event에 존재하지 않음');
        target.userNames.push(curVote.user.userName);
      });
    }

    res.status(200).json(ret);
  } catch (error) {
    next(error);
  }
};
