import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data: any;
  userData: any;
  username:any;
  email:any;
  yourrequest:any;
  remainerequest:any;
  request_limit: any;
  subscription_data:any;
  daily_number_of_requests:any;
  isPageLoaded: boolean = false;

  // About change password
  isDataUpdated : boolean = false;
  user_id : any;
  isLogged : boolean = false;
  resData : any;
  errorUpdate : boolean = false;;
  new_password : string = '';
  new_password_confirmation : string = '';
  responseUpdate:any;
  isAdmin:boolean= false;
  daily_requests_limit:any;

  form : FormGroup = new FormGroup({});
  constructor(private userService: UserService,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    if(this.userService.isAdmin()){
      this.isAdmin = true;
    }

    this.form = this.formBuilder.group({
      password : ['' , [Validators.required , Validators.minLength(8) ]],
      new_password : ['' , [Validators.required , Validators.minLength(8) ]],
      new_password_confirmation : ['' , [Validators.required]],
    })

    this.userService.getUserData().subscribe((response)=>{
      this.data = response;
      this.userData = this.data.user
      this.username = this.userData.name;
      this.email = this.userData.email;
      this.subscription_data = this.userData.expire_date
      this.yourrequest = this.userData.monthly_number_of_requests
      this.request_limit = this.data.request_limit;
      this.daily_requests_limit = this.data.daily_requests_limit;
      this.daily_number_of_requests = this.userData.daily_number_of_requests;
      this.isPageLoaded = true;
    })
  }

  changePassword(){

    if(this.form.valid)
    {
      this.userService.updateUserPassword(this.form.value).subscribe(response=>{
        this.responseUpdate = response;
        this.new_password = '';
        this.new_password_confirmation = '';
        if(this.responseUpdate.data !== null){
          this.isDataUpdated = true;
          this.errorUpdate = false;
        }else{
          this.isDataUpdated = false;
          this.errorUpdate = true;
        }
      }, console.error);
    }
    else
    {
      this.isDataUpdated = false;
      this.errorUpdate = true;
      this.isLogged = true;
      alert('please check your info and try again');
      this.new_password = '';
      this.new_password_confirmation = '';
    }
  }

  resetCompanies(){
    this.userService.resetCompanies().subscribe(response=>{
      location.reload()
    })
  }

  resetLoggedUsers(){
    this.userService.resetLoggedUsers().subscribe(response=>{})
  }


}
