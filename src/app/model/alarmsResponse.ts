import { Alarm } from './alarm';
import { Paging } from '../dto/paging';

export class AlarmsResponse {
  alarms: Array<Alarm>;
  pager: Paging;
  count: number;
}
