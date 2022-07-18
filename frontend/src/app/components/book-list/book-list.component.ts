import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/services/book.service';
import { Book } from '../../common/book';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-book-list',
  //templateUrl: './book-list.component.html',
  templateUrl: './book-grid.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
books:Book[]=[];
  categoryId:number=1;
  searchMode:boolean=false;
  searchword:string="";
  previousCategoryId:number=1;
  //new properties for server side paging 
  currentPage:number=1;
  pageSize:number=6;
  totalRecords:number=0;

  constructor(private bookService:BookService, private activatedRoute : ActivatedRoute, private ngbPaginationConfig : NgbPaginationConfig) { 
    ngbPaginationConfig.maxSize=3;
    ngbPaginationConfig.boundaryLinks=true;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(()=>{
      this.listBooks();
    });
    
  }
 
 listBooks(){
  this.searchMode=this.activatedRoute.snapshot.paramMap.has('keyword');
  if(this.searchMode){
    console.log("working");
    this.handleSearchBooks();
  }
  else{
    this.handleListBooks();
  }
}


handleListBooks(){

  const hasCategory =this.activatedRoute.snapshot.paramMap.has('id');

  hasCategory?this.categoryId =  this.activatedRoute.snapshot.params['id']:this.categoryId=1;
  
   if(this.previousCategoryId!=this.categoryId){
    this.currentPage=1;
   }
   this.previousCategoryId=this.categoryId;
  this.bookService.getBooks(this.categoryId,this.currentPage-1,this.pageSize).subscribe(
    this.processPaginate());
}
handleSearchBooks(){
 this.searchword= this.activatedRoute.snapshot.params['keyword'];
 this.bookService.searchBooks(this.searchword,this.currentPage-1,this.pageSize).subscribe(this.processPaginate());
}
processPaginate(){
  return (data: { _embedded: { books: Book[]; }; page: { number: number; totalElements: number; size: number; }; })=>{

    this.books=data._embedded.books;
    //page number starts from 1
    this.currentPage=data.page.number+1;
    this.totalRecords=data.page.totalElements;
    this.pageSize=data.page.size
  }
}

updatePageSize(event:Event){
this.pageSize=Number((event.target as HTMLSelectElement).value);
this.currentPage=1;
 this.listBooks()
}

}
