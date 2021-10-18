import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../../remote/user.service';

@Component({
  selector: 'app-badge-clock',
  templateUrl: './badge-clock.component.html',
  styleUrls: ['./badge-clock.component.scss']
})
export class BadgeClockComponent implements OnInit {

  userClocks: string[];
  totalTimeToWork: moment.Duration = moment.duration();

  dateChangeSub: Subscription;
  clockSub: Subscription;
  totalTimeSub: Subscription;

  constructor(private store: Store<{ simpleDateChange: moment.Moment, timeChange: { duration: moment.Duration } }>,
    private userService: UserService) { }

  ngOnInit(): void {
    this.dateChangeSub = this.store.select(state => state.simpleDateChange).subscribe(date => {
      this.clockSub = this.userService
        .getUserClocksByDate(date)
        .pipe(
          map(dates => dates.map((date, idx) => (idx % 2 === 0 ? 'Entrée ' : 'Sortie ') + date.time))
        )
        .subscribe(dates => {
          this.userClocks = dates;
          this.calculate();
        });
    });

    this.totalTimeSub = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.totalTimeToWork = duration;
      this.getEndTime();
    });
  }

  totalTimeWorked: moment.Duration;
  startTime: moment.Moment;
  calculate() {
    const times: moment.Duration[] = [];
    if (this.userClocks.length % 2 === 0 && this.userClocks.length > 0) {
      this.startTime = moment(this.userClocks[0].split(' ')[1], 'HH:mm:ss');
      for (let i = 0; i < this.userClocks.length; i += 2) {
        const start = moment(this.userClocks[i].split(' ')[1], 'HH:mm:ss');
        const end = moment(this.userClocks[i + 1].split(' ')[1], 'HH:mm:ss');
        times.push(moment.duration({ milliseconds: end.diff(start) }));
      }

      let newTotal = times[0];
      for (let i = 1; i < times.length; i++) {
        newTotal = newTotal.add(times[i]);
      }

      this.totalTimeWorked = newTotal;
    } else {
      this.totalTimeWorked = null;
    }
  }

  endTime: moment.Moment;
  getEndTime() {
    if (!this.startTime || !this.totalTimeToWork || !this.totalTimeWorked) return;
  }
}
