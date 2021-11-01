import { Component, ElementRef, OnInit, Query, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { UserFromToken } from 'src/app/model/user-from-token';
import { totalTimeChange } from 'src/app/store/actions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component..scss']
})
export class UserInfoComponent implements OnInit {
  public userToken$: Observable<string>;

  @ViewChild('token')
  token: ElementRef<HTMLTextAreaElement>;

  user$: Observable<UserFromToken>;

  constructor(private store: Store<{ userChange: UserFromToken, simpleDateChange: moment.Moment }>,
    private userService: UserService, private snack: MatSnackBar) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select(state => state.userChange);
    this.userToken$ = this.userService.getUserToken();
  }

  copyToClipboard(): void {
    this.token.nativeElement.select();
    document.execCommand('copy');
    this.token.nativeElement.blur();
    this.snack.open('Texte copié!!', null, {
      duration: 2000,
      verticalPosition: 'top'
    });
  }
}
