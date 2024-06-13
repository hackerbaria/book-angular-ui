import { HttpClient } from "@angular/common/http";
import { Book } from "./book.model";
import { map, tap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class BookService {
    constructor(private http: HttpClient){

    }

    private books: Book[] = [];


    getBooks() {
        return this.http
      .get<Book[]>(
        'https://ng-course-recipe-book-65f10.firebaseio.com/recipes.json'
      );
    }
}