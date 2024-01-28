import AppDataSource from '../config/dataSource';
import TimePiece from '../entity/timePiece.entity';

const TimePieceRepository = AppDataSource.getRepository(TimePiece).extend({});

export default TimePieceRepository;
