import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../common/book';
@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
books!:Book[];
  categoryId!:number;
  constructor(private bookService:BookService, private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.getBooks();
    })
    
  }
private getBooks(){
  const hasCategory =this.activatedRoute.snapshot.paramMap.has('id');

hasCategory?this.categoryId =  this.activatedRoute.snapshot.params['id']:this.categoryId=1;

 
this.bookService.getBooks(this.categoryId).subscribe((data)=>{
    this.books=data;
  });
}



}
