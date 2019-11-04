import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { merge } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-hourcalculator';

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
}
