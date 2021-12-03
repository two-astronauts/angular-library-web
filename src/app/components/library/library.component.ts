import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Services
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  private subscriptions = new Subscription();

  public value: string;
  public books: any;
  public result: Boolean;

  constructor(private bookService: BookService) {
    this.value = '';
    this.books = [];
    this.result = false;
  }

  ngOnInit(): void {
  }

  public search(): void {
    this.subscriptions.add(
      this.bookService.getBooksByAuthor(this.value).subscribe(books => {
        this.books = books;
        this.result = true;
      })
    );
  }

  public htmltoPDF(): void {
    const doc = new jsPDF()
    doc.text(`Libros del autor ${this.books[0].author.name} ${this.books[0].author.lastname}`, 15, 10);
    autoTable(doc, { html: '#result' })
    doc.save('result.pdf');
  }

}
