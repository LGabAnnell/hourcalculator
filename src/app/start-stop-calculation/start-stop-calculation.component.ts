import { Component } from '@angular/core';
import { TimeCalculator } from '../utils/time-calculator';
import * as moment from "moment";
import { ClockInOut } from 'src/model/clockinout';
import { Store, select } from '@ngrx/store';
import { saveManualClocks, removeOneManualClock } from '../store/actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-stop-calculation',
  templateUrl: './start-stop-calculation.component.html',
  styleUrls: ['./start-stop-calculation.component.scss']
})
export class StartStopCalculationComponent {

  clocks: ClockInOut[] = [];

  worked: string = "";
  private left = {
    hours: 8,
    minutes: 12
  };

  public leftToDisplay = "";
  public remaining: string = "";

  storesub: Subscription;

  constructor(private store: Store<{ manualClocks: ClockInOut[] }>) {
    this.storesub = this.store.pipe(select('manualClocks'))
      .subscribe(this.setClocks);
  }

  setClocks = (clocks: ClockInOut[]) => {
    this.clocks = clocks;
  }

  addClockInOrOut() {
    const last = this.clocks[this.clocks.length - 1];
    const lastMinute = +last.value[4] + 1; 
    
    this.clocks.push(new ClockInOut(last.value.slice(0, 4) + lastMinute));

    setTimeout(() => {
      const inputs: HTMLInputElement[] = 
        Array.from(document.querySelector("#clockInOutForm").querySelectorAll("input"));
      inputs[inputs.length - 1].click();
    });
  }

  calculate() {
    if (this.clocks.length % 2 === 0 || this.clocks.length === 1)
      return;

    let total = moment.duration(0);
    for (let i = 0; i < this.clocks.length - 1; i += 2) {
      total.add(TimeCalculator.getDiff(this.clocks[i].value, this.clocks[i + 1].value));
    }

    const left = moment.duration(this.left).subtract(total);

    this.worked = TimeCalculator.convertToHoursAndMinutes(total);//  hours + ":" + minutes 
    this.leftToDisplay = TimeCalculator.convertToHoursAndMinutes(left);
    const last = moment(this.clocks[this.clocks.length - 1].value, "HH:mm");
    this.remaining = last.add(left).format("HH:mm");
  }

  removeClock(index: number) {
    if (this.clocks.length === 1) return;
    this.store.dispatch(removeOneManualClock({ index }));
  }

  ngOnDestroy() {
    this.store.dispatch(saveManualClocks());
    this.storesub.unsubscribe();
  }
}
