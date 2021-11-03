import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { startPauseChange } from 'src/app/store/actions';

@Component({
  selector: 'app-start-pause-calculation',
  templateUrl: './start-pause-calculation.component.html',
  styleUrls: ['./start-pause-calculation.component.scss']
})
export class StartPauseCalculationComponent implements OnInit, OnDestroy {

  dayStart = '08:00';

  supposedTotal = moment.duration({
    hours: 8,
    minutes: 24
  });

  pauseDuration = moment.duration({
    hours: 0,
    minutes: 45
  });

  endTime: string = moment(this.dayStart, 'HH:mm')
    .add(this.supposedTotal)
    .add(moment.duration({ hours: 0, minutes: 30 }))
    .format('HH:mm');
  storeHolder: Subscription;
  startTimeSub: Subscription;

  constructor(private store: Store<{ timeChange: { duration: moment.Duration },
    startPause: moment.Moment }>) { }

  ngOnInit() {
    this.storeHolder = this.store.select(state => state.timeChange).subscribe(({ duration }) => {
      this.supposedTotal = duration;
      this.calculate();
    });

    this.startTimeSub = this.store.select(state => state.startPause).subscribe(time => {
      this.dayStart = time.format('HH:mm');
      this.calculate();
    });
  }

  ngOnDestroy() {
    this.storeHolder.unsubscribe();
    this.startTimeSub?.unsubscribe();
  }

  startChange(value: string) {
    const start = moment(value, 'HH:mm');
    this.store.dispatch(startPauseChange({ time: start }));

    this.endTime = start.clone().add(this.supposedTotal).add(this.pauseDuration).format('HH:mm');
  }

  calculate() {
    const ds = moment(this.dayStart, 'HH:mm');
    this.endTime = ds.add(this.supposedTotal).add(this.pauseDuration).format('HH:mm');
  }

  pauseDurationChange(value: string) {
    const ds = moment(this.dayStart, 'HH:mm');

    const valuesAsNumbers = value.split(':').map(v => +v);
    const pauseDuration = moment.duration({
      hours: valuesAsNumbers[0],
      minutes: valuesAsNumbers[1]
    });

    this.pauseDuration = pauseDuration;

    this.endTime = ds.add(this.supposedTotal).add(pauseDuration).format('HH:mm');
  }
}
