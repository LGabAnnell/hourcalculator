import { Component, ElementRef, Query, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { merge, Observable, Subscription } from 'rxjs';
import * as moment from 'moment';
import { UserService } from './modules/remote/user.service';
import { UserFromToken } from './model/user-from-token';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomNavigationComponent } from './bottom-navigation/bottom-navigation.component';
import { MatButton } from '@angular/material/button';

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

  isLoggedIn = false;

  @ViewChild('menuButton')
  menuButton: MatButton;

  constructor(private store: Store<any>, private userService: UserService,
    private router: Router, private bottomSheet: MatBottomSheet) {}

  ngOnInit() { 
    this.userService.getUserName().subscribe(user => {
      this.isLoggedIn = true;
      this.store.dispatch({
        type: 'User changed!',
        user: user
      });
    });
    this.store.select(state => state.userChange).subscribe(res => {
      if (!res.sub || res.sub.length === 0) {
        this.isLoggedIn = false;
        return;
      }
      this.isLoggedIn = true;
    });
  }

  openBottomSheet() {
    this.bottomSheet.open(BottomNavigationComponent).afterDismissed().subscribe(() => {
      this.menuButton._elementRef.nativeElement.blur();
    })
  }

  ngOnDestroy() {
    if (this.storeSubscription) this.storeSubscription.unsubscribe();
  }

  logout() {
    this.userService.logOut().toPromise().then(() => {
      this.store.dispatch({
        type: 'User changed!',
        user: {}
      });
      this.router.navigateByUrl('/');
    });
  }
}
