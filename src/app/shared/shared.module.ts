import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchBoardPipe } from './search-board.pipe';

@NgModule({
  declarations: [SearchBoardPipe],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  exports: [FormsModule, ReactiveFormsModule, RouterModule, SearchBoardPipe],
})
export class SharedModule {}
