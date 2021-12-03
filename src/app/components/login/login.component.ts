import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SecurityService } from '../../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private subscriptions = new Subscription();

  public loginForm: FormGroup;

  constructor(
    private securityService: SecurityService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  public login(): void {
    let {username, password} = this.loginForm.getRawValue();

    this.subscriptions.add(
      this.securityService.login(username, password).subscribe(res => {
        localStorage.setItem('access_token', res.token);
        this.openSnackBar('Se ha logueado correctamente', 'Entendido');
        this.router.navigate(['/']);
      })
    );
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
