import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';
import { NoAuthGuard } from './guards/noAuth/no-auth.guard';

// Components
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { AuthorComponent } from './components/author/author.component';
import { BookComponent } from './components/book/book.component';
import { LibraryComponent } from './components/library/library.component';
import { Page404Component } from './components/page404/page404.component';
import { Page403Component } from './components/page403/page403.component';
import { LogoutComponent } from './components/logout/logout.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      roles: ['ADMIN', 'STAFF_MEMBER', 'STUDENT']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'author',
    component: AuthorComponent,
    data: {
      roles: ['ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'book',
    component: BookComponent,
    data: {
      roles: ['ADMIN']
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryComponent,
    data: {
      roles: ['STAFF_MEMBER']
    },
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path: '403',
    component: Page403Component
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: '404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
