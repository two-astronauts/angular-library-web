import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// Services
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-delete-book',
  templateUrl: './delete-book.component.html',
  styleUrls: ['./delete-book.component.scss']
})
export class DeleteBookComponent implements OnInit {
  private subscriptions = new Subscription();
  public title: String;

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialogRef<DeleteBookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = `¿Deseas eliminar el libro "${this.data.name}"?`;
  }

  ngOnInit(): void {
  }

  public confirm() {
    this.subscriptions.add(
      this.bookService.deleteBook(this.data.id).subscribe(response => {
        this.dialogRef.close(true);
      })
    );
  }

}
