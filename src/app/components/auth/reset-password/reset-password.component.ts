import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import {ActivatedRoute,Router} from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,private router:Router, private userService: UserService, private activatedRoute:ActivatedRoute) { }
  form: FormGroup = new FormGroup({});
  isLogged: Boolean = false;
  isLoginSuccess = false;
  isLoginError = false;
  code: string = '';
  responseData: any;
  personalData: any;
  name: any;
  email: any;
  type: any;
  isSubscribe: boolean = false;
  isPersonalDataLoaded: boolean = false;
  logginData : any;
  token:any;

  ngOnInit(): void {

    this.token = this.activatedRoute.snapshot.params.token;
    if(!this.token){
      this.router.navigateByUrl('/auth/login')
    };




    this.form = this.formBuilder.group({
      email: [this.email, [Validators.email, Validators.maxLength(255), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
    });
  }

  register() {
    this.isLogged = true;

    if (
      this.form.valid &&
      this.form.controls.password.value == this.form.controls.password_confirmation.value
    ) {

      this.userService.confirmPassword(this.token,this.form.value).subscribe(res=>{
        this.logginData = res
        if (this.logginData != null) {

          if(this.logginData.user.email === 'admin@admin.com'){
            this.setWithExpiry('token', this.logginData.access_token)
            localStorage.res = JSON.stringify(this.logginData)
            localStorage.user = JSON.stringify(this.logginData.user);
            localStorage.request_limit = this.logginData.request_limit;
            localStorage.isSubscribe = true;
            this.userService.setLoggedStatus(true);
            this.isLoginSuccess = true;
            this.isLoginError = false;
            this.router.navigateByUrl('/pricing')
          }else{
            alert('please let we confirm your information first!')
            location.assign('http://www.patreon.com/oauth2/authorize?response_type=code&client_id=l_C9HqfSV57DMgkpqvUvatGVHe2xBZechBUN0AbQ1I6Tnfu6U5R90gbkVjvVWuef&redirect_uri=https://beastmodeanalysis.com/auth/login&state=xcoiv98y2kd22vusuye3kch')

            // After Complete process
            this.setWithExpiry('token', this.logginData.access_token)
            localStorage.res = JSON.stringify(this.logginData);
            localStorage.user = JSON.stringify(this.logginData.user);
            localStorage.request_limit = this.logginData.request_limit;
            this.isLoginError = false;
          }



        } else {
          this.isLoginError = true;
          this.isLoginSuccess = false;
        }

      },error=>{
        console.log(error)
      });

    } else {
      this.isLoginError = true;
      this.isLoginSuccess = false;
    }

  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }

  setWithExpiry(key: string, value: any) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay() + 1;
    const full = new Date(year, month, day).toLocaleString();

    const item = {
      value: value,
      expiry: full
    }

    localStorage.setItem(key, JSON.stringify(item))
  }

}
