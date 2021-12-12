import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { ClockInOut } from 'src/model/clockinout';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnChanges {

  @Input('clocks')
  clocks: ClockInOut[];

  @Input('totalTimeToWork')
  totalTimeToWork: moment.Duration;

  @Output('onInput')
  onInput: EventEmitter<{ time: string, index: number }> = new EventEmitter();

  @Output('onRemove')
  onRemove: EventEmitter<{ index: number }> = new EventEmitter();

  totalTimeWorked: moment.Duration;

  endTime: moment.Moment;

  remaining: moment.Duration;

  tableColumns = [
    'timeWorked',
    'timeLeft',
    'endTime'
  ];

  tableData: [{
    timeWorked?: moment.Duration,
    timeLeft?: moment.Duration,
    endTime?: moment.Moment
  }] = [{
    timeLeft: moment.duration(0),
    timeWorked: moment.duration(0),
    endTime: moment(0)
  }];

  showTable = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clocks) {
      this.clocks = changes.clocks.currentValue;
    }

    if (changes.totalTimeToWork) {
      this.totalTimeToWork = changes.totalTimeToWork.currentValue;
    }

    this.calculate();
  }

  calculate() {
    if (this.totalTimeToWork && this.clocks && this.clocks.length > 1) {
      const newTotal = moment.duration(0);
      for (let i = 0; i < this.clocks.length - 1; i += 2) {
        const start = moment(this.clocks[i].value, 'HH:mm');
        const end = moment(this.clocks[i + 1].value, 'HH:mm');
        newTotal.add(end.diff(start));
      }
      this.totalTimeWorked = newTotal;

      const left = moment.duration(this.totalTimeToWork).subtract(this.totalTimeWorked);

      this.endTime = moment(this.clocks[this.clocks.length - 1].value, 'HH:mm').add(left);
      this.remaining = left;
      this.tableData = [{
        endTime: this.endTime,
        timeLeft: this.remaining,
        timeWorked: this.totalTimeWorked
      }];
    }
  }

  newInput(index: number, time: string) {
    this.onInput.emit({
      index,
      time
    });
  }

  removeClock(i: number) {
    this.onRemove.emit({ index: i });
    this.calculate();
  }
}
