import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { render } from 'creditcardpayments/creditCardPayments';
// declare var paypal: { Buttons: (arg0: { style: { shape: string; color: string; layout: string; label: string; }; createSubscription: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => void; }) => { (): any; new(): any; render: { (arg0: string): void; new(): any; }; }; };
declare var paypal: any;



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  paypal: any
  @ViewChild('paypal') paypalElement?: ElementRef;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

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
  registerData: any;
  pay_status: any;
  payer_email: any;
  payer_id: any;
  amount_paid: any;
  owner_email: any;
  expire_date: any;
  subscription_id = '';
  emailNotExist: boolean = false;
  paypalResponse: any;


  RenderPaypalButton() {
    paypal.Buttons({
      style: {
        shape: 'rect',
        color: 'gold',
        layout: 'vertical',
        label: 'subscribe'
      },
      createSubscription: function (data: any, actions: any) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-62C08595CD314874VMGIRN6Y'
        });
      },
      onApprove: (data: any, actions: any) => {
        this.paypalResponse = data;
        this.subscription_id = this.paypalResponse.subscriptionID
        // this.recordUser()
        this.userService.register(
          {
            name: this.form.controls.name.value,
            email: this.form.controls.email.value,
            password: this.form.controls.password.value,
            password_confirmation: this.form.controls.password_confirmation.value,
            expire_date: this.form.controls.expire_date.value,
            subscriptionID: this.subscription_id
          }
        ).subscribe(response => {
          console.log('backEndResponse', response)
          this.registerData = response
          if (this.registerData.data != null) {
            this.setWithExpiry('token', this.registerData.data.access_token)
            localStorage.user = JSON.stringify(this.registerData.data.user);
            localStorage.isSubscribe = true;
            this.userService.setLoggedStatus(true);
            this.router.navigateByUrl('/score-card');
            location.reload();
            this.isLoginSuccess = true;
            this.isLoginError = false;
          } else {
            this.isLoginError = true;
            this.isLoginSuccess = false;
            this.router.navigateByUrl('/auth/login')
          }

        }, console.error)
      },
      onError: (error: any) => {
        console.log(error)
      }
    }).render('#paypal-button-container-P-62C08595CD314874VMGIRN6Y'); // Renders the PayPal button
  }
  ngOnInit(): void {

    // ****** Check if user logged ********//
    if(this.userService.isLogged()){
      this.userService.logout()
    }

    let x = new Date()


    // Validate Login Form
    this.form = this.formBuilder.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(255), Validators.required]],
      email: ['', [Validators.email, Validators.maxLength(255), Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      password_confirmation: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
      subscriptionID: ['', [Validators.required]],
      expire_date: [new Date(x.getFullYear(), x.getMonth() + 1, x.getUTCDate() + 1).toJSON(), [Validators.required]],
    });


  }


  //Start To Check If User Exist
  register() {
    if (
      (this.form.controls.password.value === this.form.controls.password_confirmation.value) &&
      this.form.controls.password.valid &&
      this.form.controls.password_confirmation.valid &&
      this.form.controls.email.valid &&
      this.form.controls.name.valid
    ) {

      this.userService.checkExist({ email: this.form.controls.email.value }).subscribe(res => {
        this.emailNotExist = true;
      }, error => {
        console.log(error)
        alert('Sorry, email already exist!!');
        location.reload();
        // this.router.navigateByUrl('/auth/login')
      });

    } else {
      // this.isLoginError = true;
      this.isLoginSuccess = false;
    }

  }

  //Record User After Complete Paypal Method
  recordUser() {
    this.userService.register(this.form.value).subscribe(response => {
      this.registerData = response
      if (this.registerData.data != null) {
        this.setWithExpiry('token', this.registerData.data.access_token)
        localStorage.user = JSON.stringify(this.registerData.data.user);
        localStorage.isSubscribe = true;
        this.userService.setLoggedStatus(true);
        this.router.navigateByUrl('/score-card');
        this.isLoginSuccess = true;
        this.isLoginError = false;
      } else {
        this.isLoginError = true;
        this.isLoginSuccess = false;
        this.router.navigateByUrl('/auth/login')
      }

    }, console.error)
  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
  }

  // For set cookie
  setWithExpiry(key: string, value: any) {
    let x = new Date()
    let full = new Date(x.getFullYear(), x.getMonth(), x.getUTCDate() + 1)

    let item = {
      value: value,
      expiry: full
    }

    localStorage.setItem(key, JSON.stringify(item))
  }

}

