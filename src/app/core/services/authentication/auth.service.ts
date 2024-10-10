import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Env } from '../env';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = Env.apiUrl;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient, private router: Router) {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('t');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationDate = new Date(payload.exp * 1000);
      if (expirationDate < new Date()) {
        return false;
      }
      return true;
    } catch (error) {
      console.error('Error parsing token:', error);
      return false;
    }
  }

  getToken() {
    return localStorage.getItem('t');
  }

  doLogout() {
    localStorage.removeItem('t');
    this.router.navigate(['/auth/login']);
  }

  register(user: User) {
    return this.http.post<any>(`${this.url}/auth/signup`, user);
  }

  login(user: Object) {
    return this.http.post<any>(`${this.url}/auth/signin`, user);
  }

  verifyEmail(token: String) {
    return this.http.put<any>(`${this.url}/auth/verify-email/res?t=${token}`, {
      headers: this.headers,
    });
  }

  sendResetPasswordEmail(emailObj: Object) {
    return this.http.post<any>(
      `${this.url}/auth/user/send-password-reset`,
      emailObj
    );
  }

  resetPassword(passObj: Object, token: string) {
    return this.http.put<any>(
      `${this.url}/auth/user/reset-password?t=${token}`,
      passObj
    );
  }
}
