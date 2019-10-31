import { Component, OnInit } from '@angular/core';
import { ClockInOut } from 'src/model/clockinout';
import * as moment from 'moment';
import { TimeCalculator } from '../utils/time-calculator';
import { StorageHandler } from '../utils/storage-handler';


@Component({
  selector: 'app-auto-clock',
  templateUrl: './auto-clock.component.html',
  styleUrls: ['./auto-clock.component.scss']
})
export class AutoClockComponent implements OnInit {

  clocks: ClockInOut[] = [];
  startTime: string;
  timeWorked: string;
  end;

  private supposedTotal = {
    hours: 8,
    minutes: 12
  };

  constructor() {
    this.clocks = StorageHandler.loadAutoClocks();
    if (this.clocks.length > 1 && this.clocks.length % 2 !== 0) {
      this.calc();
    }
  }

  ngOnInit() {
  }

  addClock() {
    this.clocks.push(new ClockInOut(moment().format("HH:mm")));

    if (this.clocks.length === 1) {
      this.startTime = this.clocks[0].value;
      return;
    }

    if (this.clocks.length % 2 !== 0) {
      this.calc();
    }
  }

  calc() {
    let total = moment.duration(0);
    for (let i = 0; i < this.clocks.length - 1; i += 2) {
      total.add(TimeCalculator.getDiff(this.clocks[i].value, this.clocks[i + 1].value));
    }

    const remaining = moment.duration(this.supposedTotal).subtract(total);

    const lastElIdx = this.clocks.length - 1;
    const lastEl = moment(this.clocks[lastElIdx].value, "HH:mm");

    this.end = lastEl.add(remaining).format("HH:mm");
  }

  ngOnDestroy() {
    StorageHandler.saveAutoClocks(this.clocks);
  }
}
