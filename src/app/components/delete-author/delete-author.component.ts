import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// Services
import { AuthorService } from 'src/app/services/author.service';

@Component({
  selector: 'app-delete-author',
  templateUrl: './delete-author.component.html',
  styleUrls: ['./delete-author.component.scss']
})
export class DeleteAuthorComponent implements OnInit {
  private subscriptions = new Subscription();
  public title: String;

  constructor(
    private authorService: AuthorService,
    private dialogRef: MatDialogRef<DeleteAuthorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = `¿Deseas eliminar el autor "${this.data.name}"?`;
  }

  ngOnInit(): void {
  }

  public confirm() {
    this.subscriptions.add(
      this.authorService.deleteAuthor(this.data.id).subscribe(response => {
        this.dialogRef.close(true);
      })
    );
  }

}
