import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Login, LoginResponse } from '../models/login.model';
import { UserRole } from '../models/user-role';
import { JwtPayload } from '../models/jwt-payload.model';

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
    this.removeAuthToken();
    return this.httpClient.post<any>(`${this.url}/logout`, null);
  }

  isLoggedIn(): boolean {
    return this.getAuthToken() != null;
  }

  getUserRole(): string {
    let token = this.getAuthToken();
    return token ? jwtDecode<JwtPayload>(token).role : '';
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