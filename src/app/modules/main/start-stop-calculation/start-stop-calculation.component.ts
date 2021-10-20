import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import * as moment from "moment";
import { ClockInOut } from 'src/model/clockinout';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { clockInOutWithDateAction } from 'src/app/store/reducers';
import { deleteManualClocks, removeOneManualClock, saveManualClocks } from 'src/app/store/actions';
import { TimeCalculator } from 'src/app/utils/time-calculator';

@Component({
  selector: 'app-start-stop-calculation',
  templateUrl: './start-stop-calculation.component.html',
  styleUrls: ['./start-stop-calculation.component.scss']
})
export class StartStopCalculationComponent {

  clocks: ClockInOut[] = [];

  worked: string = "";
  supposedTotal = moment.duration({
    hours: 8,
    minutes: 24
  });

  date: moment.Moment;

  public left: moment.Duration;
  public remaining: string = "";

  storesub: Subscription;
  totalSupposedAmountSub: Subscription;

  @ViewChildren('timeinput') 
  inputs: QueryList<ElementRef<HTMLInputElement>>;

  constructor(private store: Store<{ manualClocks: clockInOutWithDateAction, timeChange: { duration: moment.Duration } }>) {
    this.storesub = this.store.select(state => state.manualClocks)
      .subscribe(this.setClocks);
    this.totalSupposedAmountSub = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.supposedTotal = moment.duration({ hours: duration.hours(), minutes: duration.minutes() });
    });
  }

  setClocks = (state: clockInOutWithDateAction) => {
    this.date = state.date;
    this.clocks = state.clocks;
  }

  addClockInOrOut() {
    const last = this.clocks[this.clocks.length - 1];
    const lastMinute = +last.value[4] + 1; 
    
    this.clocks.push(new ClockInOut(last.value.slice(0, 4) + lastMinute));
    this.store.dispatch(saveManualClocks(null));
  }

  removeClock(index: number) {
    this.store.dispatch(removeOneManualClock({ index }));
  }

  ngOnDestroy() {
    this.store.dispatch(saveManualClocks(null));
    this.storesub.unsubscribe();
  }

  del() {
    this.store.dispatch(deleteManualClocks());
  }

  inputListener({ time, index }) {
    this.clocks[index].value = time;
    this.store.dispatch(saveManualClocks(null));
  }
}
