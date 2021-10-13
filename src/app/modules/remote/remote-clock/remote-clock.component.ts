import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserFromToken } from 'src/app/model/user-from-token';
import { UserService } from '../user.service';

@Component({
  selector: 'app-remote-clock',
  templateUrl: './remote-clock.component.html',
  styleUrls: ['./remote-clock.component.scss']
})
export class RemoteClockComponent implements OnInit {

  constructor(private store: Store<{ user: UserFromToken }>, private userService: UserService) { }

  public tokenReveal = false;
  public userToken: string;

  user$: Observable<UserFromToken>;
  ngOnInit(): void {
    this.user$ = this.store.select(state => state['userChange']);
  }

  revealToken(): void {
    this.userService.getUserToken().toPromise().then((token: string) => {
      this.userToken = token;
      this.tokenReveal = true;
    });
  }
}
