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
  firstFormGroup:any;
  secondFormGroup:any;
  thirdFormGroup:any;

  genders: IGender[] = [
    { value: 'man', viewValue: 'Man' },
    { value: 'woman', viewValue: 'Woman' }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { user:UserProfile },
    private dialogRef: MatDialogRef<HeaderComponent>,
    private userService: UserService,
    private appStateService: AppStateService
  ){}

  ngOnInit(){
    this.firstFormGroup = new FormGroup({
      firstName : new FormControl(this.data.user.firstName,[Validators.required]) ,
    });
    this.secondFormGroup = new FormGroup({
      lastName : new FormControl(this.data.user.lastName,[Validators.required]) ,
    });
    this.thirdFormGroup = new FormGroup({
      gender : new FormControl(this.data.user.gender,[Validators.required]) ,
    });
  }

  editProfile(){
    this.userService.updateUser({
      firstName:this.firstFormGroup.get('firstName').value,
      lastName:this.secondFormGroup.get('lastName').value,
      gender:this.thirdFormGroup.get('gender').value,
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
    })
  }
}
