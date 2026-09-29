import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  public redirectUrl: string = '';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      'https://localhost:7162/api/login/login',
      {
        UserName: username,
        Password: password
      },
      {
        responseType: 'text'
      }
    );
  }
}