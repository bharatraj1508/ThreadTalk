import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Env } from '../env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = Env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post<any>(`${this.url}/auth/signup`, user);
  }

  login(user: Object) {
    return this.http.post<any>(`${this.url}/auth/signin`, user);
  }
}
