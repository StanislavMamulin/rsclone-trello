import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
      },
      {
        path: 'main',
        loadChildren: () =>
          import('./pages/main-page/main-page.module').then((page) => page.MainPageModule),
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration-page/registration-page.module').then(page => page.RegistrationPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
