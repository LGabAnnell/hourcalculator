import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'momentToString'
})
export class MomentToStringPipe implements PipeTransform {
  private addZero = v => {
    if (v < 1) return '00';
    if (v < 10) return '0' + v;
    return v + '';
  }

  public transform(value: moment.Moment) {
    if (!value) return '';
    const v = `${this.addZero(value.hours())}:${this.addZero(value.minutes())}`;
    return v;
  }
}
