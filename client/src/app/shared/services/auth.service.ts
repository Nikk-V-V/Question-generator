import { Injectable } from '@angular/core';
import {User} from "../interfaces";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  user;

  constructor(private http: HttpClient) { }

  login(user: User): Observable<{token:string}> {
     return this.http.post<{token:string}>('/api/auth/login', user)
       .pipe(
         tap(
           (res) => {
             localStorage.setItem('authToken', res['token']);
             this.setToken(res['token'])
             localStorage.setItem('user', JSON.stringify(res['user']))
           }
         )
       )
  }

  getToken(): string {
    return this.token
  }

  setToken(token: string) {
    this.token = token
  }

  isAuthenticated(): boolean{
    return !!this.token
  }

  logOut() {
    this.setToken(null)
    localStorage.clear()
  }

  getProfile() {
    this.user = JSON.parse(localStorage.getItem('user'))
  }

  register(user: User): Observable<User> {
    return this.http.post<User>('api/auth/register', user)
  }

}
