import { Component, OnInit } from '@angular/core';
import { ClockInOut } from 'src/model/clockinout';
import * as moment from 'moment';
import { TimeCalculator } from '../utils/time-calculator';
import { Store, select } from '@ngrx/store';
import { deleteAutoClocks, saveAutoClocks, removeOneAutoClock, saveManualClocks } from '../store/actions';
import { Subscription } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import { clockInOutAction } from '../store/reducers';

@Component({
  selector: 'app-auto-clock',
  templateUrl: './auto-clock.component.html',
  styleUrls: ['./auto-clock.component.scss']
})
export class AutoClockComponent {

  clocks: ClockInOut[] = [];
  startTime: string;
  timeWorked: string;
  end: string = "";

  supposedTotal: moment.Duration;

  private autoClocksSubscriber: Subscription;
  private durationSubscriber: Subscription;

  constructor(private store: Store<{ autoClocks: clockInOutAction, timeChange: { duration: moment.Duration } }>) {}

  ngOnInit() {
    this.autoClocksSubscriber = this.store.select('autoClocks').subscribe(({ clocks }) => {
      this.clocks = clocks;
      this.startCalculation();
    });

    this.durationSubscriber = this.store.select('timeChange').subscribe(({ duration }) => {
      this.supposedTotal = duration;
      this.startCalculation();
    });
  }

  startCalculation() {
    if (!this.supposedTotal) return;

    if (this.clocks.length > 1 && this.clocks.length % 2 !== 0) {
      this.calc();
    } else {
      this.end = '';
    }
  }

  addClock() {
    this.clocks.push(new ClockInOut(moment().format("HH:mm")));

    this.store.dispatch(saveAutoClocks());

    if (this.clocks.length === 1) {
      this.startTime = this.clocks[0].value;
      return;
    }

    this.startCalculation();
  }

  calc() {
    let total = moment.duration(0);
    for (let i = 0; i < this.clocks.length - 1; i += 2) {
      total.add(TimeCalculator.getDiff(this.clocks[i].value, this.clocks[i + 1].value));
    }

    const remaining = moment.duration({
      hours: this.supposedTotal.hours(),
      minutes: this.supposedTotal.minutes()
    }).subtract(total);

    const lastElIdx = this.clocks.length - 1;
    const lastEl = moment(this.clocks[lastElIdx].value, "HH:mm");

    this.end = lastEl.add(remaining).format("HH:mm");
  }

  ngOnDestroy() {
    this.autoClocksSubscriber.unsubscribe();
    this.durationSubscriber.unsubscribe();
  }
  
  del() {
    this.store.dispatch(deleteAutoClocks());
  }

  removeClock(i: number) {
    this.store.dispatch(removeOneAutoClock({
      index: i
    }));
  }
}
