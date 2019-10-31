import { Component } from '@angular/core';
import { StorageHandler } from './utils/storage-handler';
import { Store } from '@ngrx/store';
import { deleteAutoClocks, saveAutoClocks, deleteManualClocks } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'material-hourcalculator';

  constructor(private store: Store<any>) {

  }

  del() {
    this.store.dispatch(deleteAutoClocks());
    this.store.dispatch(deleteManualClocks());
  }
}
