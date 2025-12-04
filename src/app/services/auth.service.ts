import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface LoginCredentials{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private loginUrl = 'http://localhost:8080/login';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) { }

  login(credentials: LoginCredentials): Observable<any>{
    return this.http.post(this.loginUrl, credentials);
  }

  saveToken(token: string): void{
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated():boolean {
    return !!this.getToken();
  }

  logout(): void{
    localStorage.removeItem(this.tokenKey);
    window.location.reload();
  }
}
