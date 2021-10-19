import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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

  userClocks: {
    value: string
  }[];
  totalTimeToWork: moment.Duration = moment.duration();

  dateChangeSub: Subscription;
  clockSub: Subscription;
  totalTimeSub: Subscription;

  @ViewChildren('timeInput')
  timeInputs: QueryList<HTMLInputElement>;

  constructor(private store: Store<{ simpleDateChange: moment.Moment, timeChange: { duration: moment.Duration } }>,
    private userService: UserService) { }

  ngOnInit(): void {
    this.dateChangeSub = this.store.select(state => state.simpleDateChange).subscribe(date => {
      this.clockSub = this.userService
        .getUserClocksByDate(date)
        .pipe(map(dates => dates.map(date => date.time)))
        .subscribe(dates => {
          this.userClocks = dates.map(value => {
            const split = value.split(':');
            return { value: split[0] + ':' + split[1] };
          });
          this.calculate();
        });
    });

    this.totalTimeSub = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.totalTimeToWork = duration;
      this.calculate();
    });
  }

  totalTimeWorked: moment.Duration;
  startTime: moment.Moment;
  endTime: moment.Moment;
  calculate() {
    if (this.totalTimeToWork && this.userClocks && this.userClocks.length > 0) {
      const newTotal = moment.duration(0);
      for (let i = 0; i < this.userClocks.length - 1; i += 2) {
        const start = moment(this.userClocks[i].value, 'HH:mm');
        const end = moment(this.userClocks[i + 1].value, 'HH:mm');
        newTotal.add(end.diff(start));
      }

      this.totalTimeWorked = newTotal;

      const left = moment.duration(this.totalTimeToWork).subtract(this.totalTimeWorked);

      this.endTime = moment(this.userClocks[this.userClocks.length - 1].value, 'HH:mm').add(left);
    } else {
      this.totalTimeWorked = null;
    }
  }

  saveInput(i: number, time: string) {
    this.userClocks[i].value = time;
    this.calculate();
  }
}
