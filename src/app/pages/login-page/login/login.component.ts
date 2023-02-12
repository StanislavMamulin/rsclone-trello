import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginParams } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  isHidePassword = true;

  submitted = false;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      enterPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;

    const loginData: LoginParams = {
      email: this.form.value.emailFormControl,
      password: this.form.value.enterPassword,
    };

    this.auth.login(loginData).subscribe((res) => console.log(res));
  }
}
