import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Env
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  public httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getAuthors(): Observable<any> {
    return this.httpClient.get<any>(environment.api + '/author', this.httpOptions);
  }

  public saveAuthor(author: any): Observable<any> {
    return this.httpClient.post<any>(environment.api + '/author', author, this.httpOptions);
  }

  public updateAuthor(author: any): Observable<any> {
    return this.httpClient.put<any>(environment.api + '/author', author, this.httpOptions);
  }

  public deleteAuthor(id: Number): Observable<any> {
    return this.httpClient.delete<any>(environment.api + '/author/' + id, this.httpOptions);
  }

}
