import AppDataSource from '../config/dataSource';
import Event from '../entity/event.entity';

const EventRepository = AppDataSource.getRepository(Event).extend({});

export default EventRepository;
