import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';

// Env
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  public currentUser: any;

  constructor(
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {
    if (this.isAuthenticated()) {
      const token = this.getToken();
      this.currentUser = this.jwtHelper.decodeToken(token);
    }
  }

  public getToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  public login(username: string, password: string): Observable<any> {
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);
    return this.httpClient.post<any>(environment.api + '/login', body).pipe(
        map((res: any) => {
          if (res && res.token) {
            this.currentUser = this.jwtHelper.decodeToken(res.token);
          }
          return res;
        })
      );
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.currentUser = null;
  }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
