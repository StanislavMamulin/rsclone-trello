import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/modules/services/user.service';

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
  isLoading: boolean = false;
  email:string = 'email@mail.ru'
  form: any;

  genders: IGender[] = [
    {value: 'man', viewValue: 'Man'},
    {value: 'woman', viewValue: 'Woman'},
  ];

  constructor(
    private UserService: UserService,
    private router: Router,
  ){}

  closeModal(close:boolean){
    this.isSendForm = close;
    this.isLoading = !close;
    this.router.navigate(['/login']);
    this.form.reset();
  }

  ngOnInit(){
    this.form = new FormGroup({
      firstNameControl: new FormControl('', [Validators.required,Validators.pattern(/^[A-Za-z0-9]\w{3,15}$/)]),
      lastNameControl: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z0-9]\w{3,15}$/)]),
      sexControl: new FormControl('',Validators.required),
      emailFormControl: new FormControl('', [Validators.required,Validators.email, this.restricredEmail]),
      enterPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
      repeatPassword: new FormControl('',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]),
    })
    this.updateSubmitted();
  }

  restricredEmail = (control: FormControl):{[key:string]:boolean}|null => {
    if(this.email === control.value){
      return {restricredEmail:true}
    }
    return null;
  }

  updateSubmitted(){
    if(this.form.get('enterPassword')?.value === this.form.get('repeatPassword')?.value){
      this.isSubmitted = false;
    } else {
      this.isSubmitted = true;
    }
  }

  sendForm(){
    this.isLoading=true;
    this.isSendForm=true;

    this.UserService.userRegistartion({
      firstName: this.form.get('firstNameControl').value,
      lastName: this.form.get('lastNameControl').value,
      gender: this.form.get('sexControl').value,
      email: this.form.get('emailFormControl').value,
      password: this.form.get('enterPassword').value,
    }).subscribe(()=>{
      this.isLoading = false;
    },(err)=>{
      alert(`Email ${this.form.get('emailFormControl').value} already exists`);
      this.form.reset();
      this.isSendForm = false;
      this.isLoading = true;
    })
  }
}

