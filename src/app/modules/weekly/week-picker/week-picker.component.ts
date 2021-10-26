import { Component, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-week-picker',
  templateUrl: './week-picker.component.html',
  styleUrls: ['./week-picker.component.scss']
})
export class WeekPickerComponent implements OnInit {

  momentWeek: moment.Moment;
  weekNumber: number;
  weekRange: string;

  @Output()
  onDateChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.momentWeek = moment();
    this.momentWeek.isoWeekday(1);
    this.weekNumber = this.momentWeek.isoWeek();
    this.weekRange = this.getFirstAndLastDay();
  }

  addWeek() {
    this.weekNumber = this.momentWeek.isoWeek(this.weekNumber + 1).isoWeek();
    this.weekRange = this.getFirstAndLastDay();

    this.onDateChange.emit(this.weekNumber);
  }

  removeWeek() {
    this.weekNumber = this.momentWeek.isoWeek(this.weekNumber - 1).isoWeek();
    this.weekRange = this.getFirstAndLastDay();

    this.onDateChange.emit(this.weekNumber);
  }

  getFirstAndLastDay() {
    const clone = this.momentWeek.clone();

    return clone.isoWeekday(1).format('DD.MM') + ' - ' + clone.isoWeekday(7).format('DD.MM'); 
  }
}
