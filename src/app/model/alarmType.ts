import { AlarmCulture } from './alarmCulture';

export class AlarmType {
    action: string;
    countries: Int16Array;
    cultures: Array<AlarmCulture>;
    id: number;
    isEnabled: boolean;
    name: string;
}
