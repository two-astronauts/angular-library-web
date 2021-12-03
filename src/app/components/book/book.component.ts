import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
// Components
import { DeleteBookComponent } from '../delete-book/delete-book.component';
// Services
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';
import { KindService } from '../../services/kind.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {
  private subscriptions = new Subscription();

  public displayedColumns: string[] = ['id', 'isbn', 'name', 'editorial', 'kind', 'year', 'author', 'actions'];
  public dataSource = [];
  public kinds: any;
  public authors: any;
  public bookForm: FormGroup;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private kindService: KindService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.kinds = [];
    this.authors = [];
    this.bookForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      isbn: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      editorial: new FormControl('', Validators.required),
      kind: new FormControl('', Validators.required),
      year: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadBooks();
    this.loadKinds();
    this.loadAuthors();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public loadBooks(): void {
    this.subscriptions.add(
      this.bookService.getBooks().subscribe(books => {
        this.dataSource = books;
      })
    );
  }

  public loadAuthors(): void {
    this.subscriptions.add(
      this.authorService.getAuthors().subscribe(authors => {
        this.authors = authors;
      })
    );
  }

  public loadKinds(): void {
    this.subscriptions.add(
      this.kindService.getKinds().subscribe(kinds => {
        this.kinds = kinds;
      })
    );
  }

  public save(): void {
    let book = this.bookForm.getRawValue();
    book.kind = {
      id: book.kind
    };
    book.author = {
      id: book.author
    };
    if (book.id) {
      this.updateBook(book);
    } else {
      this.saveBook(book);
    }
  }

  public saveBook(book: any): void {
    this.subscriptions.add(
      this.bookService.saveBook(book).subscribe(book => {
        this.openSnackBar('El libro se guardó correctamente', 'Entendido');
        this.bookForm.reset();
        this.loadBooks();
      })
    );
  }

  public updateBook(book: any): void {
    this.subscriptions.add(
      this.bookService.updateBook(book).subscribe(book => {
        this.openSnackBar('El libro se modificó correctamente', 'Entendido');
        this.bookForm.reset();
        this.loadBooks();
      })
    );
  }

  public delete(book: any): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: {
        id: book.id,
        name: book.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('El libro se eliminó correctamente', 'Entendido');
        this.bookForm.reset();
        this.loadBooks();
      }
    });
  }

  public select(book: any): void {
    this.bookForm.reset();
    this.bookForm.patchValue({
      id: book.id,
      isbn: book.isbn,
      name: book.name,
      editorial: book.editorial,
      kind: book.kind.id,
      year: book.year,
      author: book.author.id
    });
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
