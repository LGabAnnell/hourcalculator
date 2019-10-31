import { Component, OnInit } from '@angular/core';
import { TimeCalculator } from '../utils/time-calculator';
import * as moment from "moment";
import { ClockInOut } from 'src/model/clockinout';
import { StorageHandler } from '../utils/storage-handler';

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

  constructor() {
    const loaded = StorageHandler.loadManualClocks();
    if (loaded.length === 0) 
      this.clocks.push(new ClockInOut("08:00"));
    else {
      this.clocks = loaded;
      this.calculate();
    }
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
    this.clocks = this.clocks.filter((_, idx) => idx !== index);
  }

  ngOnDestroy() {
    StorageHandler.saveManualClocks(this.clocks);
  }
}
