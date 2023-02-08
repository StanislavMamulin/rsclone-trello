import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChosenPipe } from './chosen.pipe';
import { ResentPipe } from './resent.pipe';
import { FilterColumnPipe } from './filter-column.pipe';

@NgModule({
  declarations: [
    ChosenPipe,
    ResentPipe,
    FilterColumnPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChosenPipe,
    ResentPipe,
    FilterColumnPipe
  ]
})
export class SharedModule { }
