import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment";
import { addZero } from '../utils/add-zero';

@Pipe({ name: 'momentToString' })
export class MomentToStringPipe implements PipeTransform {
  public transform(value: moment.Moment) {
    if (!value) return '';
    return`${addZero(value.hours())}:${addZero(value.minutes())}`;
  }
}
