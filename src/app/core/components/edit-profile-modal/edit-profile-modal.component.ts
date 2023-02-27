import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/services/user.service';
import { UserProfile } from 'src/app/shared/models/user.model';
import { AppStateService } from '../../services/app-state.service';
import { HeaderComponent } from '../header/header.component';

interface IGender {
  value:string,
  viewValue: string
}

@Component({
  selector: 'app-edit-profile-modal',
  templateUrl: './edit-profile-modal.component.html',
  styleUrls: ['./edit-profile-modal.component.scss']
})
export class EditProfileModalComponent implements OnInit {
  isLinear = false;
  firstFormGroup:FormGroup;
  secondFormGroup:FormGroup;
  thirdFormGroup:FormGroup;
  isLoading: boolean = false;

  language =  localStorage.getItem('language') || 'en'


  genders: IGender[] = [
    { value: 'man', viewValue: this.language === 'ru'? 'Мужчина' : 'Man' },
    { value: 'woman', viewValue: this.language === 'ru'? 'Женщина': 'Woman' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user:UserProfile },
    private dialogRef: MatDialogRef<HeaderComponent>,
    private userService: UserService,
    private appStateService: AppStateService
  ){}

  ngOnInit(){
    this.firstFormGroup = new FormGroup({
      firstName : new FormControl(this.data.user.firstName,[Validators.required, Validators.pattern(/^\w{3,15}$/)]),
    });
    this.secondFormGroup = new FormGroup({
      lastName : new FormControl(this.data.user.lastName,[Validators.required, Validators.pattern(/^\w{3,15}$/)]),
    });
    this.thirdFormGroup = new FormGroup({
      gender : new FormControl(this.data.user.gender,[Validators.required]),
    });
  }

  changeLanguage(){
    const lang = localStorage.getItem('language');
    this.genders = [
      { value: 'man', viewValue: lang === 'ru'? 'Мужчина' : 'Man' },
      { value: 'woman', viewValue: lang === 'ru'? 'Женщина': 'Woman' }
    ];
  }

  editProfile(){
    this.isLoading = true;
    this.userService.updateUser({
      firstName:this.firstFormGroup.get('firstName')?.value,
      lastName:this.secondFormGroup.get('lastName')?.value,
      gender:this.thirdFormGroup.get('gender')?.value,
    })
    .subscribe(res=>{
      const {firstName,lastName, gender} = res;
      this.dialogRef.close();
      this.appStateService.setCurrentUser({
        ...this.data.user,
        firstName,
        lastName,
        gender
      })
      this.isLoading = false;
    })
  }
}
