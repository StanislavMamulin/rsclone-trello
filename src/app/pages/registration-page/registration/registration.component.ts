import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})


export class RegistrationComponent implements OnInit {
  isHidePassword:boolean = true;
  isSubmitted:boolean = true;
  form: any;

  ngOnInit(){
    this.form = new FormGroup({
      firstNameControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastNameControl: new FormControl('', [Validators.required, Validators.minLength(3)]),
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





}

