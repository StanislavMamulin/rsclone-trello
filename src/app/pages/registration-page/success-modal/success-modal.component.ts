import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent implements OnInit{
  @Output() onSendForm = new EventEmitter<boolean>();
  isLoading:boolean = true;

  ngOnInit(){
    setTimeout(()=>{
      this.isLoading = !this.isLoading;
    },1000);
  }
}
