import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";

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
}