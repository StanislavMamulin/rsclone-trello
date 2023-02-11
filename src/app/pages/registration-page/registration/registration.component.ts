import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

interface IGender {
  value:string,
  viewValue: string
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})


export class RegistrationComponent implements OnInit {
  isHidePassword:boolean = true;
  isSubmitted:boolean = true;
  isSendForm: boolean = false;
  form: any;

  genders: IGender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'},
  ];

  ngOnInit(){
    this.form = new FormGroup({
      firstNameControl: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]\w{3,15}$/)]),
      lastNameControl: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]\w{3,15}$/)]),
      sexControl: new FormControl('',Validators.required),
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      enterPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
      repeatPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    })
    this.updateSubmitted();
  }


  updateSubmitted(){
    if(this.form.get('enterPassword')?.value === this.form.get('repeatPassword')?.value){
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }
  }

  sendForm(){
    this.isSendForm=!this.isSendForm;
  }
}

