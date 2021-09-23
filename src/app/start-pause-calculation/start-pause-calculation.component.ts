import { Component, OnInit } from '@angular/core';
import * as moment from "moment";

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

  endTime: string = moment(this.dayStart, "HH:mm").clone().add(this.supposedTotal.clone()).format("HH:mm");

  constructor() { }

  ngOnInit() {
  }

  startChange(value: string) {
    this.dayStart = value;
    const start = moment(value, "HH:mm");
    const supposedTotalCopy = this.supposedTotal.clone();

    this.endTime = start.add(supposedTotalCopy.add(this.pauseDuration)).format("HH:mm");
  }

  pauseDurationChange(value: string) {
    const ds = moment(this.dayStart, "HH:mm");

    const supposedTotalCopy = this.supposedTotal.clone();

    this.endTime = ds.add(supposedTotalCopy.add(value)).format("HH:mm");
  }
}
