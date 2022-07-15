import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Book} from '../common/book'
@Injectable({
  providedIn: 'root'
})
export class BookService {


private baseUrl="http://localhost:8083/api/v1/books";

  constructor(private httpClient: HttpClient) { }



getBooks(categoryId:number):Observable<Book[]>{
  const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryId}`;
return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
  map(Response=>Response._embedded.books)
);
}
 
}
interface GetResponseBooks{
  _embedded:{
    books:Book[];
  }
}
