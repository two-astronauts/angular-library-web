import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

// Components
import { DeleteAuthorComponent } from '../delete-author/delete-author.component';

// Services
import { AuthorService } from '../../services/author.service';
import { NationalityService } from '../../services/nationality.service';
import { MatSnackBar } from '@angular/material/snack-bar';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  private subscriptions = new Subscription();

  public displayedColumns: string[] = ['id', 'identification', 'name', 'lastname', 'nationality', 'actions'];
  public dataSource = [];
  public nationalities: any;
  public authorForm: FormGroup;

  constructor(
    private authorService: AuthorService,
    private nationalityService: NationalityService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.nationalities = [];
    this.authorForm = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      identification: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      nationality: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.loadAuthors();
    this.loadNationalities();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public loadAuthors(): void {
    this.subscriptions.add(
      this.authorService.getAuthors().subscribe(authors => {
        this.dataSource = authors;
      })
    );
  }

  public loadNationalities(): void {
    this.subscriptions.add(
      this.nationalityService.getNationalities().subscribe(nationalities => {
        this.nationalities = nationalities;
      })
    );
  }

  public save(): void {
    let author = this.authorForm.getRawValue();
    author.nationality = {
      id: author.nationality
    };
    if (author.id) {
      this.updateAuthor(author);
    } else {
      this.saveAuthor(author);
    }
  }

  public saveAuthor(author: any): void {
    this.subscriptions.add(
      this.authorService.saveAuthor(author).subscribe(author => {
        this.openSnackBar('El autor se guardó correctamente', 'Entendido');
        this.authorForm.reset();
        this.loadAuthors();
      })
    );
  }

  public updateAuthor(author: any): void {
    this.subscriptions.add(
      this.authorService.updateAuthor(author).subscribe(author => {
        this.openSnackBar('El autor se modificó correctamente', 'Entendido');
        this.authorForm.reset();
        this.loadAuthors();
      })
    );
  }

  public delete(author: any): void {
    const dialogRef = this.dialog.open(DeleteAuthorComponent, {
      data: {
        id: author.id,
        name: author.name + ' ' + author.lastname
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openSnackBar('El autor se eliminó correctamente', 'Entendido');
        this.authorForm.reset();
        this.loadAuthors();
      }
    });
  }

  public select(author: any): void {
    this.authorForm.reset();
    this.authorForm.patchValue({
      id: author.id,
      identification: author.identification,
      name: author.name,
      lastname: author.lastname,
      nationality: author.nationality.id
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
