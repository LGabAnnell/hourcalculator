import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { totalTimeChange } from '../store/actions';

@Component({
  selector: 'total-time-chooser',
  templateUrl: './total-time-chooser.component.html',
  styleUrls: ['./total-time-chooser.component.scss']
})
export class TotalTimeChooserComponent implements OnInit {

  addZeroIfNeeded = (v: number) => {
    if (v < 10) return `0${v}`;
    return v;
  }

  storeSub: Subscription
  value: moment.Duration;
  displayValue: string;
  
  constructor(private store: Store<{ timeChange: { duration: moment.Duration } }>) {
    this.storeSub = store.select('timeChange').subscribe(({ duration }) => {
      this.value = duration;
      this.displayValue = `${this.addZeroIfNeeded(this.value.hours())}:${this.addZeroIfNeeded(this.value.minutes())}`
    }); 
  }


  ngOnInit(): void {

  }

  valueChange(value: string) {
    const hoursAndMinutes = value.split(":").map(v => +v);
    this.store.dispatch(totalTimeChange({ duration: moment.duration({ hours: hoursAndMinutes[0], minutes: hoursAndMinutes[1] }) }))
  }

}
