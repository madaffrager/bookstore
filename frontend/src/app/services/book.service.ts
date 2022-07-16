import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import{Book} from '../common/book'
import { BookCategory } from '../common/book-category';
@Injectable({
  providedIn: 'root'
})
export class BookService {


private baseUrl="http://localhost:8083/api/v1/books";
private categoryUrl="http://localhost:8083/api/v1/book-category";

  constructor(private httpClient: HttpClient) { }



getBooks(categoryId:number,currentPage:number,pageSize:number):Observable<GetResponseBooks>{
  const searchUrl=`${this.baseUrl}/search/categoryid?id=${categoryId}&page=${currentPage}&size=${pageSize}`;
return this.httpClient.get<GetResponseBooks>(searchUrl);
}
getBookCategories():Observable<BookCategory[]>{
  return this.httpClient.get<GetResponseBookCategory>(this.categoryUrl).pipe(
    map(Response=>Response._embedded.bookCategory)
  );
}
searchBooks(keyword:string):Observable<Book[]>{
  const searcnhUrl=`${this.baseUrl}/search/searchbyname?name=${keyword}`;
  return this.getBooksList(searcnhUrl);
}
 
private getBooksList(searchUrl:string):Observable<Book[]>{
  return this.httpClient.get<GetResponseBooks>(searchUrl).pipe(
    map(Response=>Response._embedded.books)
  );
}

getBook(bookId:number):Observable<Book>{
  const bookDetailsUrl=`${this.baseUrl}/${bookId}`;
  return this.httpClient.get<Book>(bookDetailsUrl);
}



}


interface GetResponseBooks{
  _embedded:{
    books:Book[];
  },
  page:{
    //number of records on each page
    size:number,
    //total number of records in DB
    totalElements:number,
    //total number of pages starting from 0
    totalPages:number,
    //current page
    number:number
  }
}
interface GetResponseBookCategory{
  _embedded:{
    bookCategory:BookCategory[];
  }
}
