import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'durationToString' })
export class DurationToStringPipe implements PipeTransform {
  private addZero = (v) => {
    if (v < 1) return '00';
    if (v < 10) return '0' + v;
    return v + '';
  }

  public transform(value: moment.Duration) {
    if (!value) {
      return '';
    }
    let hours = value.hours();
    let minutes = value.minutes();

    if (hours < 0 || minutes < 0) {
      hours *= -1;
      minutes *= -1;
      return '-' + this.addZero(hours) + ':' + this.addZero(minutes);
    } else {
      return `${ this.addZero(value.hours()) }:${ this.addZero(value.minutes()) }`;
    }
  }
}
