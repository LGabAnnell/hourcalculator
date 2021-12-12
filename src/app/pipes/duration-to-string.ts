import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import { addZero } from '../utils/add-zero';

@Pipe({ name: 'durationToString' })
export class DurationToStringPipe implements PipeTransform {
  public transform(value: moment.Duration): string {
    if (!value) {
      return '';
    }

    let hours = value.hours();
    let minutes = value.minutes();
    if (hours < 0 || minutes < 0) {
      hours *= -1;
      minutes *= -1;
      return '-' + addZero(hours) + ':' + addZero(minutes);
    } else {
      return `${addZero(value.hours())}:${addZero(value.minutes())}`;
    }
  }
}
