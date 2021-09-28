import { Component } from '@angular/core';
import { TimeCalculator } from '../utils/time-calculator';
import * as moment from "moment";
import { ClockInOut } from 'src/model/clockinout';
import { Store } from '@ngrx/store';
import { saveManualClocks, removeOneManualClock, deleteManualClocks } from '../store/actions';
import { Subscription } from 'rxjs';
import { clockInOutWithDateAction } from '../store/reducers';

@Component({
  selector: 'app-start-stop-calculation',
  templateUrl: './start-stop-calculation.component.html',
  styleUrls: ['./start-stop-calculation.component.scss']
})
export class StartStopCalculationComponent {

  clocks: ClockInOut[] = [];

  worked: string = "";
  private supposedTotal = {
    hours: 8,
    minutes: 24
  };

  date: moment.Moment;

  public leftToDisplay = "";
  public remaining: string = "";

  storesub: Subscription;
  totalSupposedAmountSub: Subscription;

  constructor(private store: Store<{ manualClocks: clockInOutWithDateAction, timeChange: { duration: moment.Duration } }>) {
    this.storesub = this.store.select('manualClocks')
      .subscribe(this.setClocks);
    this.totalSupposedAmountSub = this.store.select('timeChange').subscribe(({ duration }) => {
      this.supposedTotal = { hours: duration.hours(), minutes: duration.minutes() };
      this.calculate();
    })
  }

  setClocks = (state: clockInOutWithDateAction) => {
    this.date = state.date;
    this.clocks = state.clocks;
    this.calculate();
  }

  addClockInOrOut() {
    const last = this.clocks[this.clocks.length - 1];
    const lastMinute = +last.value[4] + 1; 
    
    this.clocks.push(new ClockInOut(last.value.slice(0, 4) + lastMinute));
    this.store.dispatch(saveManualClocks(null));

    setTimeout(() => {
      const inputs: HTMLInputElement[] = 
        Array.from(document.querySelector("#clockInOutForm").querySelectorAll("input"));
      inputs[inputs.length - 1].click();
    });
  }

  calculate() {
    if (this.clocks.length % 2 === 0 || this.clocks.length === 1) {
      this.worked = '';
      this.leftToDisplay = '';
      this.remaining = '';
      return;
    }

    let total = moment.duration(0);
    for (let i = 0; i < this.clocks.length - 1; i += 2) {
      total.add(TimeCalculator.getDiff(this.clocks[i].value, this.clocks[i + 1].value));
    }

    const left = moment.duration(this.supposedTotal).subtract(total);

    this.worked = TimeCalculator.convertToHoursAndMinutes(total);//  hours + ":" + minutes 
    this.leftToDisplay = TimeCalculator.convertToHoursAndMinutes(left);
    const last = moment(this.clocks[this.clocks.length - 1].value, "HH:mm");
    this.remaining = last.add(left).format("HH:mm");
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

  saveValue(index: number, value: string) {
    this.clocks[index].value = value;
    this.store.dispatch(saveManualClocks(null));
  }
}
