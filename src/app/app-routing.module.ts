import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'board',
        loadChildren: () =>
          import('./pages/board-page/board-page.module').then((page) => page.BoardPageModule),
        canActivate:[AuthGuard],
        title: 'Trello | Boards'
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main-page/main-page.module').then((page) => page.MainPageModule),
          title: 'Trello | Info'
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration-page/registration-page.module').then(page => page.RegistrationPageModule),
        title: 'Trello | Registration'
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/login-page/login-page.module').then(page => page.LoginPageModule),
        title: 'Trello | Log in'
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
