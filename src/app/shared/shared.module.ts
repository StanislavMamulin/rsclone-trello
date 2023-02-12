import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ChosenPipe } from './chosen.pipe';
import { ResentPipe } from './resent.pipe';
import { SearchPipePipe } from './search-pipe.pipe';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SortByParamsPipe } from './sort-date.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    ChosenPipe,
    ResentPipe,
    SortByParamsPipe,
    SearchPipePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ChosenPipe,
    ResentPipe,
    SearchPipePipe,
    MatAutocompleteModule,
    SortByParamsPipe,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
})
export class SharedModule {}
