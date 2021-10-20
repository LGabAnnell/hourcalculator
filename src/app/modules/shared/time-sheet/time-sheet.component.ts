import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { removeOneManualClock } from 'src/app/store/actions';
import { ClockInOut } from 'src/model/clockinout';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {

  @Input('clocks')
  clocks: ClockInOut[];

  @Input('totalTimeToWork')
  totalTimeToWork: moment.Duration;

  @Output('onInput')
  onInput: EventEmitter<{ time: string, index: number}> = new EventEmitter();

  @Output('onRemove')
  onRemove: EventEmitter<{ clocks: ClockInOut[] }> = new EventEmitter();

  totalTimeWorked: moment.Duration;

  endTime: moment.Moment;

  remaining: moment.Duration;

  constructor(private store: Store) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.calculate();
  }

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

      const left = moment.duration(this.totalTimeToWork).subtract(this.totalTimeWorked);

      this.endTime = moment(this.clocks[this.clocks.length - 1].value, 'HH:mm').add(left);

      this.totalTimeWorked = newTotal;
      this.remaining = left;
    }
  }

  newInput(index: number, time: string) {
    this.onInput.emit({
      index,
      time
    });
    this.clocks[index].value = time;
    this.calculate();
  }

  removeClock(i: number) {
    this.clocks = this.clocks.filter((_, index) => index !== i);

  }
}
