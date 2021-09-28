import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from "moment";
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-start-pause-calculation',
  templateUrl: './start-pause-calculation.component.html',
  styleUrls: ['./start-pause-calculation.component.scss']
})
export class StartPauseCalculationComponent implements OnInit {

  dayStart: string = "08:00";
  pauseDuration: string = "00:30";

  supposedTotal = moment.duration({
    hours: 8,
    minutes: 24
  });

  endTime: string = moment(this.dayStart, "HH:mm").add(this.supposedTotal).add(moment.duration({ hours: 0, minutes: 30 })).format("HH:mm"); 
  storeHolder: Subscription;

  constructor(private store: Store<{ timeChange: { duration: moment.Duration } }>) {
    this.storeHolder = store.select('timeChange').subscribe(({ duration }) => {
      console.log("STORE SUB METHOD CALLED");
      this.supposedTotal = duration;
      this.pauseDurationChange(`${duration.hours}:${duration.minutes}`);
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.storeHolder.unsubscribe();
  }

  startChange(value: string) {
    this.dayStart = value;
    const start = moment(value, "HH:mm");

    this.endTime = start.add(this.supposedTotal).add(this.pauseDuration).format("HH:mm");
  }

  pauseDurationChange(value: string) {
    const ds = moment(this.dayStart, "HH:mm");

    const supposedTotalCopy = this.supposedTotal.clone();

    this.endTime = ds.add(supposedTotalCopy.add(value)).format("HH:mm");
  }
}
