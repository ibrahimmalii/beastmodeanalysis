import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './../../../services/user.service';


@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }
  form: FormGroup = new FormGroup({});
  isLoginSuccess:boolean = false;
  isLoginError:boolean = false;
  isLogged:boolean = false;
  responseMessage : any;


  ngOnInit(): void {
    // Validate Login Form
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.maxLength(255), Validators.required]]
    });
  }


  confirmEmail(){
    this.isLogged = true;
    if(this.form.valid){
      this.userService.resetPassword(this.form.value).subscribe(response=>{
        this.responseMessage = response
        if(this.responseMessage.msg){
          this.isLoginSuccess = true
        }else{
          this.isLoginError = true
        }
      },error=>{
        console.log(error)
      })
    }
  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }


}
