import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { UserClock } from 'src/model/userclock';
import { WeeklyClocksResponse } from '../weekly/week-times/week-times.component';

export interface TimeUpdateListRequest {
  date: string;
  times: string[];
  userToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  registerNewUser(username: string, password: string) {
    return this.http.post('api/users/new', { username, password });
  }

  login(username: string, password: string) {
    return this.http.post('api/login', { username, password });
  }

  getUserName() {
    return this.http.get('api/users/currentuser');
  }

  getUserToken() {
    return this.http.get('api/users/token', { responseType: 'text' });
  }

  logOut() {
    return this.http.post('api/logout', { responseType: 'text' });
  }

  getUserClocksByDate(date: moment.Moment) {
    const params = {
      date: date.format('yyyy-MM-DD')
    };
    return this.http.get<UserClock[]>('api/user-clocks-by-date', {
      params
    });
  }

  saveUserClocks(request: TimeUpdateListRequest) {
    return this.http.put('api/update-times', request);
  }

  getByWeek(week: number): Observable<WeeklyClocksResponse> {
    return this.http.get<WeeklyClocksResponse>('api/week', {
      params: { week }
    });
  }
}
