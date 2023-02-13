import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BoardService } from '../modules/board/board-service.service';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ModalLogOutComponent } from './components/modal-log-out/modal-log-out.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ModalLogOutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
  ],
  exports: [HeaderComponent, FooterComponent],
  providers: [BoardService],
})
export class CoreModule {}
