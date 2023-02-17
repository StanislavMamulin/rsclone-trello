import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    console.log(this.firstFormGroup.get('firstName').value);
  }
}
