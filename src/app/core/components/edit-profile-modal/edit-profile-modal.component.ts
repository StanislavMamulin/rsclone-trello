import { Component,Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/modules/services/user.service';
import { UserProfile } from 'src/app/shared/models/user.model';
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
    private userService: UserService
  ){}

  ngOnInit(){
    this.firstFormGroup = new FormGroup({
      firstName : new FormControl(null,[Validators.required]) ,
    });
    this.secondFormGroup = new FormGroup({
      lastName : new FormControl(null,[Validators.required]) ,
    });
    this.thirdFormGroup = new FormGroup({
      gender : new FormControl(null,[Validators.required]) ,
    });
  }

  editProfile(){
    this.userService.updateUser({
      firstName:this.firstFormGroup.get('firstName').value,
      lastName:this.secondFormGroup.get('lastName').value,
      gender:this.thirdFormGroup.get('gender').value,
    })
    .subscribe(res=>{
      console.log(res);// ничего не выводит
    })
  }
}
