import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  constructor(private store: Store<any>, private snack: MatSnackBar) { }

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
    let deferredPrompt;
    const addBtn: HTMLElement = document.querySelector(".add-btn");
    addBtn.style.display = 'none';
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI to notify the user they can add to home screen
      addBtn.style.display = 'block';
    
      addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
              console.log('User accepted the A2HS prompt');
            } else {
              console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
          });
      });
    });

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
