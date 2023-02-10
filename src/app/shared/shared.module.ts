import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChosenPipe } from './chosen.pipe';
import { ResentPipe } from './resent.pipe';
import { SortByParamsPipe } from './sort-date.pipe';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    ChosenPipe,
    ResentPipe,
    SortByParamsPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChosenPipe,
    ResentPipe,
    SortByParamsPipe,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
