import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from '../workspace-page/workspace/workspace.component';
import { BoardPageComponent } from './board/board-page.component';

const routes: Routes = [
  {
    path: '',
    component: BoardPageComponent,
  },
  {
    path: ':id',
    component: WorkspaceComponent,
    title: 'Trello | Workspace'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
