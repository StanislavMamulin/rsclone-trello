import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackComponent } from '../snack/snack.component';

interface IGender {
  value:string,
  viewValue: string
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})


export class RegistrationComponent implements OnInit {

  isHidePassword = true;

  isSubmitted = true;

  isSendForm = false;

  isLoading = false;

  email:string[] = [];

  durationInSeconds = 5;

  form: FormGroup;

  language =  localStorage.getItem('language') || 'en';

  genders: IGender[] = [{ value: 'man', viewValue: this.language === 'ru' ? 'Мужчина' : 'Man' }, { value: 'woman', viewValue: this.language === 'ru' ? 'Женщина' : 'Woman' }];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {

    this.form = new FormGroup({
      firstNameControl: new FormControl(null, [Validators.required, Validators.pattern(/^\w{3,15}$/)]),
      lastNameControl: new FormControl(null, [Validators.required, Validators.pattern(/^\w{3,15}$/)]),
      sexControl: new FormControl(null, Validators.required),
      emailFormControl: new FormControl(null, [
        Validators.required,
        Validators.email,
        this.restricredEmail,
      ]),
      enterPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/)]),
      repeatPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{9,}$/)]),
    });
    this.updateSubmitted();
  }

  changeLanguage() {
    const lang = localStorage.getItem('language');
    this.genders = [{ value: 'man', viewValue: lang === 'ru' ? 'Мужчина' : 'Man' }, { value: 'woman', viewValue: lang === 'ru' ? 'Женщина' : 'Woman' }];
  }

  restricredEmail = (control: FormControl):{ [key:string]:boolean } | null => {
    if (this.email.includes(control.value)) {
      return { restricredEmail:true };
    }
    return null;
  };

  updateSubmitted() {
    if (this.form.get('enterPassword')?.value === this.form.get('repeatPassword')?.value) {
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }
  }

  closeModal(close:boolean) {
    this.isSendForm = close;
    this.isLoading = !close;
    this.router.navigate(['/login']);
    document.body.style.overflow = 'auto';
    this.form.reset();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }

  sendForm() {
    this.isLoading = true;
    this.isSendForm = true;
    document.body.style.overflow = 'hidden';
    this.userService.userRegistartion({
      firstName: this.form.get('firstNameControl')?.value,
      lastName: this.form.get('lastNameControl')?.value,
      gender: this.form.get('sexControl')?.value,
      email: this.form.get('emailFormControl')?.value,
      password: this.form.get('enterPassword')?.value,
    }).subscribe((res)=>{
      this.isLoading = false;
      this.email.push(res.email);
    }, (err)=>{
      this.openSnackBar();
      this.form.controls.emailFormControl.setValue(null);
      this.isSendForm = false;
      this.isLoading = true;
      document.body.style.overflow = 'auto';
    });
  }

}

