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
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslocoRootModule } from '../transloco-root.module';
import { AutofocusDirective } from './directives/autofocus.directive';
import { MatMenuModule } from '@angular/material/menu';
import { CloseComponent } from './components/close/close.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { AudioServiceService } from './audio-service.service';

@NgModule({
  declarations: [
    ChosenPipe,
    ResentPipe,
    SortByParamsPipe,
    SearchPipePipe,
    AutofocusDirective,
    CloseComponent,
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
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslocoRootModule,
    MatMenuModule,
    MatStepperModule,
    MatSlideToggleModule,
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
    MatProgressBarModule,
    MatSnackBarModule,
    MatDialogModule,
    TranslocoRootModule,
    AutofocusDirective,
    MatMenuModule,
    MatStepperModule,
    MatSlideToggleModule,
  ],
  providers: [AudioServiceService],
})
export class SharedModule {}
