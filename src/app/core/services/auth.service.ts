import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/user.model';
import { Login, LoginResponse } from '../models/login.model';
import { Customer, NewCustomerUser } from '../models/customer.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: string = "http://localhost:8080/auth";
  private authTokenKey: string = "auth-token";

  constructor(private httpClient: HttpClient) { }

  login(login: Login): Observable<LoginResponse> {
    return this.httpClient.post<LoginResponse>(`${this.url}/login`, login);
  }

  logout(): Observable<any> {
    return this.httpClient.post<any>(`${this.url}/logout`, null);
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() != null;
  }

  getUserRole(): string {
    return jwtDecode(this.getAuthToken() ?? '').sub ?? '';
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  removeAuthToken() {
    localStorage.removeItem(this.authTokenKey);
  }
}