import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from "moment";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-start-pause-calculation',
  templateUrl: './start-pause-calculation.component.html',
  styleUrls: ['./start-pause-calculation.component.scss']
})
export class StartPauseCalculationComponent implements OnInit {

  dayStart: string = "08:00";

  supposedTotal = moment.duration({
    hours: 8,
    minutes: 24
  });

  pauseDuration = moment.duration({
    hours: 0,
    minutes: 45
  });

  endTime: string = moment(this.dayStart, "HH:mm").add(this.supposedTotal).add(moment.duration({ hours: 0, minutes: 30 })).format("HH:mm");
  storeHolder: Subscription;

  constructor(private store: Store<{ timeChange: { duration: moment.Duration } }>) { }

  ngOnInit() {
    this.storeHolder = this.store.select('timeChange').subscribe(({ duration }) => {
      this.supposedTotal = duration;
      this.calculate();
    });
  }

  ngOnDestroy() {
    this.storeHolder.unsubscribe();
  }

  startChange(value: string) {
    const start = moment(value, "HH:mm");

    this.endTime = start.add(this.supposedTotal).add(this.pauseDuration).format("HH:mm");
  }

  calculate() {
    const ds = moment(this.dayStart, "HH:mm");
    this.endTime = ds.add(this.supposedTotal).add(this.pauseDuration).format("HH:mm");
  }

  pauseDurationChange(value: string) {
    const ds = moment(this.dayStart, "HH:mm");

    const valuesAsNumbers = value.split(':');
    const pauseDuration = moment.duration({
      hours: +valuesAsNumbers[0],
      minutes: +valuesAsNumbers[1]
    });

    this.pauseDuration = pauseDuration;

    const supposedTotalCopy = this.supposedTotal.clone();

    this.endTime = ds.add(supposedTotalCopy).add(pauseDuration).format("HH:mm");
  }
}
