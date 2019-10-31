import * as moment from "moment";

export class TimeCalculator {
    static getDiff(value1: string, value2: string): moment.Duration {
        const start = moment(value1, "HH:mm");
        const end = moment(value2, "HH:mm");

        return moment.duration(end.diff(start));
    }

    static convertToHoursAndMinutes(d: moment.Duration): string {
        const h = +d.asHours().toString().split(".")[0];
        const m = d.asMinutes() % 60;

        let retH: number | string = h;
        let retM: number | string = m;

        if (retH < 10) { 
            retH = "0" + h;
        }

        if (retM < 10) {
            retM = "0" + m;
        }

        return retH + ":" + retM;
    }
}