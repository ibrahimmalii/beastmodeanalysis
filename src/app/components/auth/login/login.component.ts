import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';
declare var paypal: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isSubscribeError: boolean = false;
  isResubscribeSuccessfully: boolean = false;
  isUserNeedSubscribe: boolean = false;
  isUserHasMultiLogged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  form: FormGroup = new FormGroup({});
  isLogged: Boolean = false;
  isLoginSuccess = false;
  isLoginError = false;
  code: string = '';
  responseData: any;
  logginData: any;
  personalData: any;
  isSubscribe: boolean = false;
  email: any;
  responsedEmail: any;
  subscription_id: any;
  userID: any;
  paypalResponse: any;

  // About resubscribe
  RenderPaypalButton() {
    paypal
      .Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe',
        },
        createSubscription: function (data: any, actions: any) {
          return actions.subscription.create({
            /* Creates the subscription */
            plan_id: 'P-62C08595CD314874VMGIRN6Y',
          });
        },
        onApprove: (data: any, actions: any) => {
          this.paypalResponse = data;
          if (this.paypalResponse.subscriptionID) {
            let x = new Date();
            this.userService
              .updateStatus(this.userID, {
                subscribe_status: 'completed',
                subscriptionID: data.subscriptionID,
                expire_date: new Date(
                  x.getFullYear(),
                  x.getMonth() + 1,
                  x.getUTCDate() + 1
                ).toJSON(),
              })
              .subscribe((response) => {
                // After Complete process
                this.isResubscribeSuccessfully = true;
                this.setWithExpiry('token', this.logginData.data.access_token);
                localStorage.user = JSON.stringify(this.logginData.data.user);
                localStorage.isSubscribe = true;
                this.userService.setLoggedStatus(true);
                this.isLoginError = false;
                this.isSubscribeError = false;
                this.isResubscribeSuccessfully = false;
                this.router.navigateByUrl('/score-card');
                location.reload();
              });
          }
        },
      })
      .render('#paypal-button-container-P-62C08595CD314874VMGIRN6Y'); // Renders the PayPal button
  }
  ngOnInit(): void {
    this.userService.isLogged() && this.router.navigateByUrl('/score-card');

    // Validate Login Form
    this.form = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.maxLength(255), Validators.required],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  login() {
    this.isLogged = true;

    if (this.form.valid) {
      this.userService.login(this.form.value).subscribe(
        (res) => {
          this.logginData = res;
          if (this.logginData.data != null) {
            if (this.logginData.data.user.email === 'admin@admin.com') {
              this.setWithExpiry('token', this.logginData.data.access_token);
              localStorage.user = JSON.stringify(this.logginData.data.user);
              localStorage.isSubscribe = true;
              this.userService.setLoggedStatus(true);
              this.isLoginSuccess = true;
              this.isLoginError = false;
              this.isSubscribeError = false;
              this.isResubscribeSuccessfully = false;
              this.isUserHasMultiLogged = false;
              this.router.navigateByUrl('/score-card');
            } else {
              let x = new Date();
              if (
                this.logginData.data.user.expire_date > x.toJSON() &&
                this.logginData.data.user.subscribe_status == 'completed'
              ) {
                // Check if user open from another lab or not
                this.setWithExpiry('token', this.logginData.data.access_token);
                localStorage.user = JSON.stringify(this.logginData.data.user);
                localStorage.isSubscribe = true;
                this.userService.setLoggedStatus(true);
                this.isLoginSuccess = true;
                this.isLoginError = false;
                this.isSubscribeError = false;
                this.isResubscribeSuccessfully = false;
                this.isUserHasMultiLogged = false;
                this.router.navigateByUrl('/score-card');
              } else if (
                this.logginData.data.user.subscribe_status != 'completed' ||
                this.logginData.data.user.expire_date < x.toJSON()
              ) {
                this.userID = this.logginData.data.user.id;
                this.userService
                  .updateStatus(this.userID, { subscribe_status: 'pending' })
                  .subscribe((response) => {});
                this.isSubscribeError = true;
                this.isUserNeedSubscribe = true;
                localStorage.clear();
              }
            }
          } else {
            this.isLoginError = true;
            this.isLoginSuccess = false;
          }
        },
        (error) => {
          if (error.error.errors.msg) {
            this.isUserHasMultiLogged = true;
            this.isLoginError = false;
            return;
          }
          this.isLoginError = true;
          this.isUserHasMultiLogged = false;
          this.isLoginSuccess = false;
        }
      );
    } else {
      this.isLoginError = true;
      this.isLoginSuccess = false;
    }
  }

  hide() {
    this.isLoginSuccess = false;
    this.isLoginError = false;
    this.isSubscribeError = false;
    this.isResubscribeSuccessfully = false;
    this.isUserHasMultiLogged = false;
  }

  // For set cookie
  setWithExpiry(key: string, value: any) {
    let x = new Date();
    let full = new Date(x.getFullYear(), x.getMonth(), x.getUTCDate() + 2);

    let item = {
      value: value,
      expiry: full,
    };

    localStorage.setItem(key, JSON.stringify(item));
  }
}
