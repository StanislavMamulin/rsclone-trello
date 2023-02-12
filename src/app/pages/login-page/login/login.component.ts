import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  invalidCredentials = false;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      emailFormControl: new FormControl('', [Validators.required, Validators.email]),
      enterPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.submitted = true;

    const loginData: LoginParams = {
      email: this.form.value.emailFormControl,
      password: this.form.value.enterPassword,
    };

    this.auth.login(loginData).subscribe({
      next: () => {
        this.form.reset();
        this.router.navigate(['/board']);
        this.submitted = false;
        this.invalidCredentials = false;
      },
      error: () => {
        this.submitted = false;
        this.invalidCredentials = true;
      },
    });
  }
}
