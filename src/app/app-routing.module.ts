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
        loadChildren: () => import('./pages/board-page/board-page.module').then(page => page.BoardPageModule)
      },
      {
        path: 'main',
        loadChildren: () => import('./pages/main-page/main-page.module').then(page => page.MainPageModule)
      },
      {
        path: 'workspace',
        loadChildren: () => import('./pages/workspace-page/workspace.module').then(page => page.WorkspaceModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
