import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Env
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KindService {

  public httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getKinds(): Observable<any> {
    return this.httpClient.get<any>(environment.api + '/kind', this.httpOptions);
  }
}
