import { Observable } from 'rxjs';
import { Info } from './info';
import { Header } from './header';
import { Coordinate } from './Coordinate';
import { AlarmType } from './alarmType';

enum NotificationType {
    Push = 0,

    Web = 1,

    SMS = 2,

    Email = 3
}

enum AlarmStatus {
        Attend = 0,

        Comment = 1,

        Reserve = 2
    }

export class Alarm {
    address: string;
    AttentionRequired: boolean;
    CorrelationId: string;
    Data: Array<Info>;
    Description: string;
    eventDate: Date;
    Header: Header;
    id: string;
    location: Coordinate;
    Message: string;
    Notification: Array<NotificationType>;
    serviceCode: string ;
    status: AlarmStatus;
    title: string;
    type: AlarmType;
    lastModified: Date;
    userName: string;
    read: boolean;
    deleted: boolean;
 }

