import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookService } from './book.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  books: Book[] = []
  constructor(private http: HttpClient, private router:Router){

  }
  ngOnInit() {
    this.http.get<Book[]>('http://localhost:8080/api/v1/books').subscribe(books => {
      this.books = books;
  })
  }



}
