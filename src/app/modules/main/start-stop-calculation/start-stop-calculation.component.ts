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
  private supposedTotal = {
    hours: 8,
    minutes: 24
  };

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
      this.inputs.last.nativeElement.click();
    });
  }

  calculate() {
    if (this.clocks.length % 2 === 0 || this.clocks.length === 1) {
      this.worked = '';
      this.left = moment.duration();
      this.remaining = '';
      return;
    }

    let total = moment.duration(0);
    for (let i = 0; i < this.clocks.length - 1; i += 2) {
      total.add(TimeCalculator.getDiff(this.clocks[i].value, this.clocks[i + 1].value));
    }

    this.left = moment.duration(this.supposedTotal).subtract(total);

    this.worked = TimeCalculator.convertToHoursAndMinutes(total); //  hours + ":" + minutes 
    const last = moment(this.clocks[this.clocks.length - 1].value, "HH:mm");
    
    this.remaining = last.add(this.left).format("HH:mm");
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
