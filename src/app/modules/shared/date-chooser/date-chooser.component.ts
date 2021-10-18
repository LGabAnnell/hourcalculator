import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { dateChange } from 'src/app/store/actions';

@Component({
  selector: 'app-date-chooser',
  templateUrl: './date-chooser.component.html',
  styleUrls: ['./date-chooser.component.scss']
})
export class DateChooserComponent {
  date: moment.Moment = moment();
  storeSubscription: Subscription;
  
  constructor(private store: Store<any>) {}

  public dateChange(value: string) {
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
