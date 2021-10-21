import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClockInOut } from 'src/model/clockinout';
import { UserClock } from 'src/model/userclock';
import { UserService } from '../../remote/user.service';

@Component({
  selector: 'app-badge-clock',
  templateUrl: './badge-clock.component.html',
  styleUrls: ['./badge-clock.component.scss']
})
export class BadgeClockComponent implements OnInit {

  userClocks: UserClock[];
  clocksForInputs: ClockInOut[];
  totalTimeToWork: moment.Duration = moment.duration();

  dateChangeSub: Subscription;
  clockSub: Subscription;
  totalTimeSub: Subscription;

  @ViewChildren('timeInput')
  timeInputs: QueryList<HTMLInputElement>;

  constructor(private store: Store<{ simpleDateChange: moment.Moment, timeChange: { duration: moment.Duration } }>,
    private userService: UserService, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.dateChangeSub = this.store.select(state => state.simpleDateChange).subscribe(date => {
      this.clockSub = this.userService
        .getUserClocksByDate(date)
        .subscribe(userClocks => {
          this.userClocks = userClocks;
          this.clocksForInputs = userClocks.map(clock => new ClockInOut(clock.time));
        });
    });

    this.totalTimeSub = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.totalTimeToWork = duration;
    });
  }

  saveInput({ index, time }: { index: number, time: string }) {
    this.userClocks[index].time = time;
    this.clocksForInputs[index].value = time;
    this.clocksForInputs = [...this.clocksForInputs];
  }

  removeClock({ index }: { index: number }) {
    this.userClocks = this.userClocks.filter((_, idx) => idx !== index);
    this.clocksForInputs = [...this.clocksForInputs.filter((_, idx) => idx !== index)];
  }

  async saveClocks() {
    const token = await this.userService.getUserToken().toPromise();
    this.userService.saveUserClocks({
        date: this.userClocks[0].date,
        times: this.userClocks.map(uc => uc.time),
        userToken: token
    }).toPromise()
      .then(() => {
        this.snack.open('Enregistré!', null, {
          duration: 2000
        });
      });
  }

  async addClock() {
    const clock = moment();
    const newClock = {
      time: clock.format('HH:mm'),
      date: clock.format('yyyy-MM-DD'),
    }

    this.userClocks = [...this.userClocks, newClock];
    this.clocksForInputs = [...this.clocksForInputs, new ClockInOut(newClock.time)];
  }
}
