import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'durationToString' })
export class DurationToStringPipe implements PipeTransform {
  private addZero = v => {
    if (v < 1) return '00';
    if (v < 10) return '0' + v;
    return v + '';
  }

  public transform(value: moment.Duration) {
    const v = `${this.addZero(value.hours())}:${this.addZero(value.minutes())}`;
    return v;
  }
}