import { Component, ViewChildren, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSnackBar, MatDatepicker } from '@angular/material';
import * as moment from 'moment';
import { dateChange } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-hourcalculator';
  date: moment.Moment = moment();

  constructor(private store: Store<any>, private snack: MatSnackBar) {}

  ngOnInit() {
    const manual$ = this.store.select('manualClocks');
    const auto$ = this.store.select('autoClocks');

    merge(manual$, auto$).pipe(filter(({ action }) => 
      action && (action.type === 'Delete manual clocks' || action.type === 'Delete auto clocks'))
    ).subscribe(() => {
      this.snack.open('Delete successful!', null, {
        duration: 2000,
      });
    });
  }

  ngAfterViewInit() {
  }

  dateChange(value: string) {
    this.date = moment(value, 'DD.MM.YYYY');
    this.store.dispatch(dateChange({ date: this.date }));
  }

  addDay() {
    this.date = moment(this.date).add({ days: 1 });
    this.store.dispatch(dateChange({ date: this.date }));
  }

  removeDay() {
    this.date = moment(this.date).subtract({ days: 1 });
    this.store.dispatch(dateChange({ date: this.date }));
  }
}
