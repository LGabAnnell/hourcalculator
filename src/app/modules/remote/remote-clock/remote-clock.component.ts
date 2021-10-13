import { Component, ElementRef, OnInit, Query, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { UserFromToken } from 'src/app/model/user-from-token';
import { UserService } from '../user.service';

@Component({
  selector: 'app-remote-clock',
  templateUrl: './remote-clock.component.html',
  styleUrls: ['./remote-clock.component.scss']
})
export class RemoteClockComponent implements OnInit {

  constructor(private store: Store<{ user: UserFromToken }>, private userService: UserService, private snack: MatSnackBar) { }

  public tokenReveal = false;
  public userToken: string;

  @ViewChild('token')
  token: ElementRef<HTMLInputElement>;

  user$: Observable<UserFromToken>;
  ngOnInit(): void {
    this.user$ = this.store.select(state => state['userChange']);
  }

  revealToken(): void {
    const subscription: Subscription = this.userService.getUserToken().subscribe(token => {
      this.userToken = token;
      this.tokenReveal = true;
    }, () => {}, () => { subscription?.unsubscribe(); });
  }
  
  copyToClipboard(): void {
    this.token.nativeElement.select();
    document.execCommand("copy");
    this.snack.open('Token copied to clipboard!', null, { duration: 2000 });
  }

  hide() {
    this.tokenReveal = false;
  }
}
