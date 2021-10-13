import { Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { dateChange, userChange } from './store/actions';
import { UserService } from './modules/remote/user.service';
import { UserFromToken } from './model/user-from-token';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-hourcalculator';
  date: moment.Moment = moment();
  storeSubscription: Subscription;

  user$: Observable<UserFromToken>;

  constructor(private store: Store<any>, private snack: MatSnackBar, private userService: UserService) {
    const manual$ = this.store.select('manualClocks');
    const auto$ = this.store.select('autoClocks');

    this.storeSubscription = merge(manual$, auto$).pipe(filter(({ action }) =>
      action && (action.type === 'Delete manual clocks' || action.type === 'Delete auto clocks'))
    ).subscribe(() => {
      this.snack.open('Delete successful!', null, {
        duration: 2000,
      });
    });
  }

  ngOnInit() { 
    this.userService.getUserName().subscribe(user => {
      this.store.dispatch({
        type: 'User changed!',
        user: user
      });
    });
  }

  ngOnDestroy() {
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

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
