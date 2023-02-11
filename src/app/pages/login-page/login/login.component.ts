import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:any;
  isHidePassword:boolean = true;

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      enterPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    })
  }
}
