import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Env
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  public httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  public getBooks(): Observable<any> {
    return this.httpClient.get<any>(environment.api + '/book', this.httpOptions);
  }

  public getBooksByAuthor(identification: string): Observable<any> {
    return this.httpClient.get<any>(`${environment.api}/book/author/${identification}`, this.httpOptions);
  }

  public saveBook(book: any): Observable<any> {
    return this.httpClient.post<any>(environment.api + '/book', book, this.httpOptions);
  }

  public updateBook(book: any): Observable<any> {
    return this.httpClient.put<any>(environment.api + '/book', book, this.httpOptions);
  }

  public deleteBook(id: Number): Observable<any> {
    return this.httpClient.delete<any>(environment.api + '/book/' + id, this.httpOptions);
  }

}
